import { Message } from "@/types/Message";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
});

export const localApi = axios.create({
  baseURL: "/api",
});

type PromptResponse = {
  message: string;
  error: never;
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

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return (
    await api.post<string>(`/upload/${file.name}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data;
};

export const searchDocs = async (query: string) =>
  (
    await api
      .get<
        { url: string; numberOfWords: number; content: string; uid: string }[]
      >("/search", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          query,
        },
      })
      .catch(console.warn)
  )?.data;
