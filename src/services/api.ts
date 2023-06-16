import { Message } from "@/types/Message";
import axios from "axios";
import { logger } from "./logger";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
});

export const localApi = axios.create({
  baseURL: "/api",
});

export type PromptResponse = {
  message: string;
  error: never;
  sources?: Source[];
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

export type DocResponse = {
  url: string;
  numberOfWords: number;
  content: string;
  uid: string;
  name: string;
};

export const searchDocs = async (query: string) =>
  (
    await api
      .get<DocResponse[]>("/search", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          query,
        },
      })
      .then((res) => {
        try {
          logger.info("Got docs: ", { docs: res.data, query });
        } catch (e) {
          console.log(e);
        }
        return res;
      })
      .catch((e) => {
        console.error(
          "Failed to search docs:",
          JSON.parse(JSON.stringify(e)),
          e
        );
        logger.error("Failed to search docs:", JSON.parse(JSON.stringify(e)));
      })
  )?.data;
