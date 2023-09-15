"use client";
import { promptApi } from "@/services/api";
import { canAsk } from "@/services/rateLimit";
import { Message as MessageType } from "@/types/Message";

import { useAuth, useUser } from "@clerk/nextjs";
import {
  FileText,
  PaperPlaneRight,
  Polygon,
  Spinner,
  User,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import {
  AutoHeightTextarea,
  maxResizableInputHeight,
} from "../ui/resizingTextArea";
import { useToast } from "../use-toast";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { GradientBtn } from "../GradientBtn";
import { whatsappLink } from "../../app/links";
import { useI18n } from "../../locales/client";
import { useLogger } from "next-axiom";
import { useRouter } from "next/navigation";

export default function Chat() {
  const [userInput, setUserInput] = useState(``);
  const [loading, setLoading] = useState(false);
  const t = useI18n();
  const logger = useLogger();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const toast = useToast();

  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const user = useUser();
  const router = useRouter();
  if (user.isSignedIn === false) {
    router.push(`/sign-in`);
  }
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
        message: t(`chat.errorMsg`),
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
        title: t(`planLimitErrorMessage.questions`),
        description: (
          <Link href={whatsappLink} target="_blank">
            <GradientBtn>{t(`planLimitErrorMessage.description`)}</GradientBtn>
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
          sources: never;
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
    logger.info(`question`, {
      input: userInput,
      output: data.message,
      user: user.user?.id,
      sources: data.sources,
    });
    setUserInput(``);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        message: data.message,
        type: `robot`,
        timestamp: new Date(),
        sources: data.sources,
      },
    ]);
    setLoading(false);
    await logger.sendLogs();
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
  const [inputHeight, setInputHeight] = useState<number>(0);
  const inputSpacing = 16;
  return (
    <main
      className={`${styles.main} flex bg-background max-w-7xl xl:w-[80rem] xl:mx-auto `}
    >
      <div
        className={`${styles.cloud} flex flex-1`}
        style={{
          height: `calc(100vh - ${
            (inputHeight > maxResizableInputHeight
              ? maxResizableInputHeight
              : inputHeight) +
            (maxResizableInputHeight + inputSpacing)
          }px)`,
          minHeight: `inherit`,
        }}
      >
        <div ref={messageListRef} className={styles.messagelist}>
          <Message
            content={t(`chat.firstMessage`)}
            type={`robot`}
            index={0}
            sources={``}
            loading={false}
          />
          {messages.map(({ message, type, sources }, index) => {
            return (
              <Message
                key={index}
                content={message}
                sources={sources || []}
                type={type}
                loading={loading && index === messages.length - 1}
                index={index}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles.cloudform}>
          <form onSubmit={handleSubmit}>
            <div className="p-4 flex gap-4 items-center flex-1 w-full border rounded-lg border-solid border-neutral-700 pr-4">
              <AutoHeightTextarea
                disabled={loading}
                onKeyDown={handleEnter}
                ref={textAreaRef}
                autoFocus={false}
                onChangeHeight={setInputHeight}
                id="userInput"
                name="userInput"
                placeholder={t(`chat.inputPlaceholder`)}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className={`${styles.textarea} max-h-80 `}
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
export const Message = ({
  content,
  type,
  sources,
  loading,
}: {
  content: string;
  type: `userMessage` | `robot`;
  sources: string[] | string;
  loading: boolean;
  index: number;
}) => {
  const parsedSources =
    typeof sources === `string` ? sources.split(`,`) : sources;
  return (
    <div
      className={`items-center ${
        type === `userMessage` && loading
          ? styles.usermessagewaiting
          : type === `robot`
          ? styles.apimessage
          : styles.usermessage
      }`}
    >
      {/* Display the correct icon depending on the message type */}
      <div className="mr-2">
        {type === `robot` ? (
          <Polygon size={30} color="white" />
        ) : (
          <User size={30} color="white" />
        )}
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <div className={styles.markdownanswer}>
          <ReactMarkdown rehypePlugins={[rehypeRaw]} linkTarget={`_blank`}>
            {content}
          </ReactMarkdown>
        </div>
        {sources && (
          <div className="flex gap-2 flex-wrap">
            {parsedSources?.map((source) => (
              <div
                key={source}
                className="flex self-start items-center text-xs border border-border border-solid gap-1 bg-card p-2 rounded-md"
              >
                <FileText height={14} width={14} /> {source}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
