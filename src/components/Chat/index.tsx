"use client";
import { DocResponse, PromptResponse, promptApi } from "@/services/api";
import { canAsk, getLastDayRequestCount } from "@/services/rateLimit";
import { Message as MessageType } from "@/types/Message";

import { useUser } from "@clerk/nextjs";
import { PaperPlaneRight, Spinner } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { useToast } from "../use-toast";
import Link from "next/link";
import { Message } from "./Message";
import { GradientBtn } from "../GradientBtn";

export default function Chat() {
  const [userInput, setUserInput] = useState(``);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([
    {
      message: `Hi there! How can I help?`,
      type: `robot`,
      timestamp: new Date(0),
    },
  ]);
  const toast = useToast();

  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const user = useUser();
  console.log(user);
  // Auto scroll chat to bottom
  useEffect(() => {
    const messageList = messageListRef.current;
    if (!messageList) {
      return;
    }
    messageList.scrollTop = messageList.scrollHeight;
  }, [messages]);

  // Focus on text field on load
  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  // Handle errors
  const handleError = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        message: `Oops! There seems to be an error. Please try again.`,
        type: `robot`,
        timestamp: new Date(),
      },
    ]);
    setLoading(false);
    setUserInput(``);
  };

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!(await canAsk())) {
      return toast.toast({
        title: `Você chegou no limite de perguntas`,
        description: (
          <Link href="" target="_blank">
            <GradientBtn>Contate-nos para continuar usando</GradientBtn>
          </Link>
        ),
      });
    }
    if (userInput.trim() === ``) {
      return;
    }

    setLoading(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: userInput, type: `userMessage`, timestamp: new Date() },
    ]);

    const newMsg: MessageType = {
      id: messages.length,
      message: userInput,
      type: `userMessage`,
      timestamp: new Date(),
    };
    const messagesWithoutFirst = messages.slice(1);
    // Send user question and history to API

    const data = await promptApi(userInput, [
      ...messagesWithoutFirst,
      newMsg,
    ]).catch(
      (e) =>
        ({
          error: e.message,
        } as {
          error: string;
          message: never;
        })
    );

    if (data.error) {
      handleError();
      return;
    }

    // Reset user input
    setUserInput(``);

    if (data.error === `Unauthorized`) {
      handleError();
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        message: data,
        type: `robot`,
        timestamp: new Date(),

        sources: (data as unknown as PromptResponse).sources as DocResponse[],
      },
    ]);
    setLoading(false);
  };

  // Prevent blank submissions and allow for multiline input
  const handleEnter = (e: {
    key: string;
    shiftKey: any;
    preventDefault: () => void;
  }) => {
    if (e.key === `Enter` && userInput) {
      if (!e.shiftKey && userInput) {
        handleSubmit(e);
      }
    } else if (e.key === `Enter`) {
      e.preventDefault();
    }
  };

  return (
    <main
      className={`${styles.main} flex bg-background max-w-7xl xl:w-[80rem] xl:mx-auto `}
    >
      <div className={`${styles.cloud} flex flex-1`}>
        <div ref={messageListRef} className={styles.messagelist}>
          {messages.map((message, index) => {
            const [content, sources] =
              message.message.split(`\n\n\n\nsources:`);
            console.log({
              content,
              sources,
            });
            return (
              <Message
                key={index}
                content={content}
                sources={sources}
                type={message.type}
                loading={loading}
                index={index}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles.cloudform}>
          <form onSubmit={handleSubmit}>
            <div className="p-4 flex gap-4 items-center flex-1 w-full border rounded-lg border-solid border-neutral-700 pr-2">
              <textarea
                disabled={loading}
                onKeyDown={handleEnter}
                ref={textAreaRef}
                autoFocus={false}
                rows={1}
                maxLength={512}
                id="userInput"
                name="userInput"
                placeholder={
                  loading ? `Waiting for response...` : `Type your question...`
                }
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className={`${styles.textarea}`}
              />

              <button type="submit" disabled={loading}>
                {loading ? (
                  <Spinner className="animate-spin" size={28} />
                ) : (
                  <PaperPlaneRight size={28} className="text-neutral-400 " />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
