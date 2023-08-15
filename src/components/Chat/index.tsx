"use client";
import { DocResponse, PromptResponse, promptApi } from "@/services/api";
import { Message } from "@/types/Message";
import rehypeRaw from "rehype-raw";

import { useUser } from "@clerk/nextjs";
import {
  FileText,
  PaperPlaneRight,
  Polygon,
  Spinner,
  User,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./index.module.css";
import {
  AutoHeightTextarea,
  maxResizableInputHeight,
} from "../ui/resizingTextArea";

export default function Chat() {
  const [userInput, setUserInput] = useState(
    `nvm odsifjao saosidjfoai sjdofijaosidjfo aisdjfoaijsdfo iasdfoaijsdoifj asodifjaosid foasjdfo anvm odsifjao saosidjfoai sjdofijaosidjfo aisdjfoaijsdfo iasdfoaijsdoifj asodifjaosid foasjdfo anvm odsifjao saosidjfoai sjdofijaosidjfo aisdjfoaijsdfo iasdfoaijsdoifj asodifjaosid foasjdfo anvm odsifjao saosidjfoai sjdofijaosidjfo aisdjfoaijsdfo iasdfoaijsdoifj asodifjaosid foasjdfo anvm odsifjao saosidjfoai sjdofijaosidjfo aisdjfoaijsdfo iasdfoaijsdoifj asodifjaosid foasjdfo a`
  );
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      message: `Hi there! How can I help?`,
      type: `robot`,
      timestamp: new Date(0),
    },
    {
      message: `nvm odsifjao saosidjfoai sjdofijaosidjfo aisdjfoaijsdfo iasdfoaijsdoifj asodifjaosid foasjdfo anvm odsifjao saosidjfoai sjdofijaosidjfo aisdjfoaijsdfo iasdfoaijsdoifj asodifjaosid foasjdfo anvm odsifjao saosidjfoai sjdofijaosidjfo aisdjfoaijsdfo iasdfoaijsdoifj asodifjaosid foasjdfo anvm odsifjao saosidjfoai sjdofijaosidjfo aisdjfoaijsdfo iasdfoaijsdoifj asodifjaosid foasjdfo anvm odsifjao saosidjfoai sjdofijaosidjfo aisdjfoaijsdfo iasdfoaijsdoifj asodifjaosid foasjdfo anvm odsifjao saosidjfoai sjdofijaosidjfo aisdjfoaijsdfo iasdfoaijsdoifj asodifjaosid foasjdfo anvm odsifjao saosidjfoai sjdofijaosidjfo aisdjfoaijsdfo iasdfoaijsdoifj asodifjaosid foasjdfo anvm odsifjao saosidjfoai sjdofijaosidjfo aisdjfoaijsdfo iasdfoaijsdoifj asodifjaosid foasjdfo anvm odsifjao saosidjfoai sjdofijaosidjfo aisdjfoaijsdfo iasdfoaijsdoifj asodifjaosid foasjdfo a`,
      type: `userMessage`,
      timestamp: new Date(1),
    },
  ]);

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

    if (userInput.trim() === ``) {
      return;
    }

    setLoading(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: userInput, type: `userMessage`, timestamp: new Date() },
    ]);

    const newMsg: Message = {
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
              // The latest message sent by the user will be animated while waiting for a response
              // <div
              //   key={index}
              //   className={`items-center ` +
              //     (message.type === `userMessage` &&
              //       loading &&
              //       index === messages.length - 1
              //       ? styles.usermessagewaiting
              //       : message.type === `robot`
              //         ? styles.apimessage
              //         : styles.usermessage)
              //   }
              // >
              //   {/* Display the correct icon depending on the message type */}
              //   <div className="mr-2">
              //     {message.type === `robot` ? (
              //       <Polygon size={30} color="white" />
              //     ) : (
              //       <User size={30} color="white" />
              //     )}
              //   </div>
              //   <div className="flex flex-col gap-2 flex-1">
              //     <div className={styles.markdownanswer}>
              //       <ReactMarkdown
              //         rehypePlugins={[rehypeRaw]}
              //         linkTarget={`_blank`}
              //       >
              //         {content}
              //       </ReactMarkdown>
              //     </div>
              //     {sources && <div className="flex gap-2">
              //       {sources?.split(`,`).map(source =>
              //         <div key={source} className="flex self-start items-center text-xs border border-border border-solid gap-1 bg-card p-2 rounded-md">
              //           <FileText height={14} width={14} />  {source}
              //         </div>
              //       )
              //       }
              //     </div>}
              //   </div>
              // </div>
            );
          })}
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles.cloudform}>
          <form onSubmit={handleSubmit}>
            <div className="p-4 flex gap-4 items-center flex-1 w-full border rounded-lg border-solid border-neutral-700 pr-2">
              <AutoHeightTextarea
                disabled={loading}
                onKeyDown={handleEnter}
                ref={textAreaRef}
                autoFocus={false}
                onChangeHeight={setInputHeight}
                id="userInput"
                name="userInput"
                placeholder={
                  loading ? `Waiting for response...` : `Type your question...`
                }
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className={`${styles.textarea} max-h-80`}
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
  sources: string;
  loading: boolean;
  index: number;
}) => {
  return (
    <div
      className={
        `items-center ` +
        (type === `userMessage` && loading
          ? // &&                    index === messages.length - 1
            styles.usermessagewaiting
          : type === `robot`
          ? styles.apimessage
          : styles.usermessage)
      }
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
          <div className="flex gap-2">
            {sources?.split(`,`).map((source) => (
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
