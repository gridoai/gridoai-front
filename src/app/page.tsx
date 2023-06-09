"use client";
import { Textarea } from "@/components/textarea";
import { useToast } from "@/components/use-toast";
import { Toast } from "@radix-ui/react-toast";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { promptApi, uploadFile } from "../services/api";

export interface Message {
  id: number;
  content: string;
  sender: string;
  timestamp: Date;
}

interface MessageProps {
  message: Message;
  isSender: boolean;
  author?: string;
}

const ChatMessage: React.FC<MessageProps> = ({ message, isSender }) => {
  const messageBubbleClass = isSender
    ? "relative  text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
    : "relative  text-sm bg-white py-2 px-4 shadow rounded-xl";

  return (
    <div
      className={
        isSender
          ? "col-start-6 col-end-13 p-3 rounded-lg"
          : "col-start-1 col-end-8 p-3 rounded-lg"
      }
    >
      <div
        className={`flex items-center justify-start  ${
          isSender ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* <div
          className="flex items-center justify-center h-10 w-10 rounded-full text-white bg-indigo-500 flex-shrink-0"
        >
          {message.sender}
        </div> */}
        <div className={`${messageBubbleClass} max-w-full`}>
          <div>
            {message.content.split("\n").map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load last messages
    // ...
    scrollToBottom();
  }, []);

  const addMessage = (message: Message) => {
    console.log("adding msg", message.sender);
    setMessages((messages) => [message, ...messages]);
    setTimeout(scrollToBottom, 10);
  };
  const [file, setFile] = useState<File>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    toast({ title: "File uploaded successfully" });
    if (!file) {
      return;
    }
    setLoading(true);
    console.log("uploading file", file);
    uploadFile(file)
      .then((data) => console.log(data))
      .then(() => setFile(undefined))
      .then(() => toast({ title: "File uploaded successfully" }))
      .catch((err) => {
        console.error(err);
        toast({
          title: `Error uploading file: ${err.message}`,
          type: "error",
          description: "Please try again later",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSendMessage = () => {
    if (file) {
      handleUploadClick();
      return;
    }
    if (!input) return;

    setLoading(true);
    const newMsg = {
      id: messages.length,
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    addMessage(newMsg);
    promptApi(input, [...messages, newMsg])
      .then(({ message }) => {
        addMessage({
          id: messages.length,
          content: message,
          sender: "robot",
          timestamp: new Date(),
        });
      })
      .finally(() => {
        setLoading(false);
      });

    setInput("");
  };

  return (
    <div className="flex flex-col h-full w-full p-6">
      <Toast />
      <div className="flex flex-col h-full overflow-x-auto mb-4">
        <div className="flex flex-col-reverse grid-cols-12 gap-y-2">
          <div ref={messagesEndRef} />
          {messages.map((message, i) => (
            <ChatMessage
              key={message.timestamp.getTime()}
              message={message}
              isSender={message.sender === "user"}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <input
          type="file"
          className="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-indigo-50 file:text-indigo-700
        hover:file:bg-indigo-100
            "
          onChange={handleFileChange}
        />
        <div className="flex flex-row items-center">
          <Textarea
            placeholder="Send a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            disabled={loading}
            className="ml-2 p-2  disabled:text-indigo-400 text-indigo-500 font-bold rounded-md"
            onClick={handleSendMessage}
          >
            {loading ? "Loading..." : `Send`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main className="bg-white">
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full flex-1 max-w-6xl mx-auto">
          <Chat />
        </div>
      </div>
    </main>
  );
}
