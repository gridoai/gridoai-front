"use client";

import { DocResponse } from "@/services/api";

export interface Message {
  id?: number;
  message: string;
  type: `userMessage` | `robot`;
  timestamp: Date;
  sources?: string[];
}

type MessageFrom =
  | {
      User: {};
    }
  | {
      Bot: {};
    };
export interface APIMessage {
  message: string;
  from: MessageFrom;
}
