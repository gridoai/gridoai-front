import { Message, APIMessage } from "@/types/Message";
import axios, {
  AxiosInterceptorManager,
  InternalAxiosRequestConfig,
} from "axios";
import { logger } from "./logger";

const authInterceptor = async <T>(config: InternalAxiosRequestConfig<T>) => {
  const token = await window.Clerk.session.getToken().catch(console.error);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// replaces _start and _end by start and end respectively from the query parameters because Refine has a weird default
const convertQueryParams = <T>(config: InternalAxiosRequestConfig<T>) => {
  const newConfig = {
    ...config,
    url: config.url?.replace(/_start/, "start").replace(/_end/, "end"),
  };

  return newConfig;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
});

api.interceptors.request.use(authInterceptor, console.error);
api.interceptors.request.use(convertQueryParams, console.error);

console.log(process.env.NEXT_PUBLIC_API_URL);
export type PromptResponse = {
  message: string;
  error: never;
  sources?: Source[];
};

export const promptApi = async (prompt: string, pastMessages: Message[]) => {
  const messages: APIMessage[] = pastMessages.map((m) => ({
    message: m.message,
    from: m.type === "userMessage" ? { User: {} } : { Bot: {} },
  }));

  return (
    await api.post<string>("/ask", messages, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).data;
};

export const uploadFiles = async (files: Iterable<File> | ArrayLike<File>) => {
  const formData = new FormData();

  Array.from(files).forEach((file, index) => {
    formData.append(`files`, file);
  });

  return (
    await api.post<string>(`/upload/`, formData, {
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
          // logger.info("Got docs: ", { docs: res.data, query });
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
