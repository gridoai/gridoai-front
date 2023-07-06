"use client";
import {
  DocResponse,
  PromptResponse,
  promptApi,
  uploadFiles,
} from "@/services/api";
import { logger } from "@/services/logger";
import { Message } from "@/types/Message";
import rehypeRaw from "rehype-raw";

import {
  OrganizationSwitcher,
  UserButton,
  useAuth,
  useUser,
} from "@clerk/nextjs";
import {
  Hamburger,
  PaperPlaneRight,
  Polygon,
  Spinner,
  User,
} from "@phosphor-icons/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useToast } from "../use-toast";
import styles from "./index.module.css";
import { ChevronRightIcon, MenuIcon } from "lucide-react";
import { Button } from "../ui/button";
import { SideMenu } from "../menu";

export default function Chat() {
  const [userInput, setUserInput] = useState("");
  const [history, setHistory] = useState<[string, string][]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [file, setFile] = useState<FileList | undefined>();
  const [messages, setMessages] = useState<Message[]>([
    {
      message: "Hi there! How can I help?",
      type: "robot",
      timestamp: new Date(0),
    },
  ]);

  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const uploadRef = useRef<HTMLInputElement | null>(null);
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
        message: "Oops! There seems to be an error. Please try again.",
        type: "robot",
        timestamp: new Date(),
      },
    ]);
    setLoading(false);
    setUserInput("");
  };

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (userInput.trim() === "") {
      return;
    }

    setLoading(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: userInput, type: "userMessage", timestamp: new Date() },
    ]);

    const newMsg: Message = {
      id: messages.length,
      message: userInput,
      type: "userMessage",
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
    setUserInput("");

    if (data.error === "Unauthorized") {
      handleError();
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        message: data,
        type: "robot",
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
    if (e.key === "Enter" && userInput) {
      if (!e.shiftKey && userInput) {
        handleSubmit(e);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  // Keep history in sync with messages
  useEffect(() => {
    if (messages.length >= 3) {
      setHistory([
        [
          messages[messages.length - 2].message,
          messages[messages.length - 1].message,
        ] as [string, string],
      ]);
    }
  }, [messages]);
  const [loadingFile, setLoadingFile] = useState(false);
  const handleUploadClick = () => {
    if (!file) {
      return;
    }
    setLoadingFile(true);
    logger.info("uploading file", file);
    uploadFiles(file)
      .then((data) => logger.info("file uploaded: ", file))
      .then(() => {
        toast({ title: "File uploaded successfully" });
        setFile(undefined);
        if (uploadRef.current) uploadRef.current.value = "";
      })
      .catch((err) => {
        logger.error("failed to upload file", err);
        toast({
          title: `Error uploading file: ${err.message}`,
          description: "Please try again later",
        });
      })
      .finally(() => {
        setLoadingFile(false);
      });
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files);
    }
  };

  return (
    <>
      <div className={styles.topnav}>
        <UserButton
          appearance={{
            variables: {
              colorText: "white",
              // colorBackground: "transparent",
              colorBackground: "rgba(100,100,100,0.1)",
            },
          }}
          afterSignOutUrl="/sign-in"
        />
        <SideMenu />
      </div>
      <main
        className={`${styles.main} mb-10 max-w-7xl xl:w-[80rem] xl:mx-auto `}
      >
        <div className={styles.cloud}>
          <div ref={messageListRef} className={styles.messagelist}>
            {messages.map((message, index) => {
              return (
                // The latest message sent by the user will be animated while waiting for a response
                <div
                  key={index}
                  className={
                    message.type === "userMessage" &&
                    loading &&
                    index === messages.length - 1
                      ? styles.usermessagewaiting
                      : message.type === "robot"
                      ? styles.apimessage
                      : styles.usermessage
                  }
                >
                  {/* Display the correct icon depending on the message type */}
                  <div className="mr-2">
                    {message.type === "robot" ? (
                      <Polygon size={30} color="white" />
                    ) : (
                      <User size={30} color="white" />
                    )}
                  </div>
                  <div className={styles.markdownanswer}>
                    {/* Messages are being rendered in Markdown format */}
                    <ReactMarkdown
                      rehypePlugins={[rehypeRaw]}
                      linkTarget={"_blank"}
                    >
                      {message.message}
                    </ReactMarkdown>
                    <p className="text-neutral-400">
                      {message.sources
                        ? `
                        \n\n\n\n ${message.sources
                          .map((source) =>
                            source.url
                              ? `[${source.name}](${source.url})`
                              : source.name
                          )
                          .join(", ")}
                        `
                        : ""}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center flex-wrap justify-between  gap-2 pr-4">
          <input
            type="file"
            multiple
            ref={uploadRef}
            className=" text-sm text-white
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                       file:text-white
                       file:bg-neutral-900
                      hover:file:bg-neutral-800  transition-all
              "
            onChange={handleFileChange}
          />
          {loadingFile ? (
            <Spinner className="animate-spin" size={28} />
          ) : (
            <button
              onClick={handleUploadClick}
              className="text-white font-medium"
            >
              Upload
            </button>
          )}
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
                    loading
                      ? "Waiting for response..."
                      : "Type your question..."
                  }
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className={`${styles.textarea}`}
                />

                <button type="submit" disabled={loading}>
                  {loading ? (
                    <Spinner className="animate-spin" size={28} />
                  ) : (
                    // Send icon SVG in input field
                    <PaperPlaneRight size={28} className="text-neutral-400 " />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
