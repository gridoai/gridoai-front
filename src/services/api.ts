import { Message } from "@/app/page";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
});

export const localApi = axios.create({
  baseURL: "/api",
});

type PromptResponse = {
  message: string;
};

export const promptApi = async (prompt: string, pastMessages: Message[]) =>
  (
    await localApi.post<PromptResponse>("/prompt", pastMessages, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        prompt,
      },
    })
  ).data;

export const searchDocs = async (query: string) =>
  (
    await api
      .get<string[]>("/search", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          query,
        },
      })
      .catch(console.warn)
  )?.data;
