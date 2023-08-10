"use client";
import rehypeRaw from "rehype-raw";
import { FileText, Polygon, User } from "@phosphor-icons/react";
import ReactMarkdown from "react-markdown";
import styles from "./index.module.css";

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
          ? styles.usermessagewaiting
          : type === `robot`
          ? styles.apimessage
          : styles.usermessage)
      }
    >
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
