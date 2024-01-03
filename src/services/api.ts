import { Message, APIMessage } from "@/types/Message";
import axios, {
  AxiosInstance,
  AxiosInterceptorManager,
  InternalAxiosRequestConfig,
} from "axios";
import { log } from "./logger";
import { DataProvider } from "@refinedev/core";
import baseDataProvider from "@refinedev/simple-rest";
import {
  canAsk,
  incrementRequestCount,
  incrementDocumentCount,
} from "./rateLimit";
import { getToken } from "./auth";

declare global {
  interface Window {
    baseURL?: string;
  }
}

const authInterceptor = async <T>(config: InternalAxiosRequestConfig<T>) => {
  const token = await getToken().catch(console.error);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

export const authGoogleDrive = async (params: {
  code: string;
  redirectUri: string;
}) => {
  const { data } = await api.get<[string, string]>(`/gdrive/auth`, {
    params,
  });
  return data;
};

export const importGoogleDrive = async (fileIds: string[]) => {
  const { data } = await api.post<string[]>(`/gdrive/import`, fileIds);
  return data;
};
export const currentEndpoint = () =>
  localStorage.getItem(`baseURL`) ||
  window.baseURL ||
  process.env.NEXT_PUBLIC_API_URL;

const endpointInterceptor = async <T>(
  config: InternalAxiosRequestConfig<T>
) => {
  if (typeof window === `undefined`) {
    return config;
  }

  config.baseURL = currentEndpoint();
  return config;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || `/api`,
});

api.interceptors.request.use(authInterceptor, console.error);
api.interceptors.request.use(endpointInterceptor, console.error);

type RestDataProvider = Omit<
  Required<DataProvider>,
  `createMany` | `updateMany` | `deleteMany`
>;

type RefineApiClient = Parameters<typeof baseDataProvider>[1];

export const refreshDriveToken = async (
  refreshToken: string
): Promise<[string, string] | null> =>
  (
    await api
      .post<[string, string]>(
        `/gdrive/refresh`,
        { refreshToken },
        {
          timeout: 5000,
        }
      )
      .catch((reason) => {
        log.error(
          `Failed to refresh drive token:`,
          JSON.parse(JSON.stringify(reason))
        );
        return reason;
      })
  ).data;

async function fetchWithPagination(
  current: number,
  pageSize: number,
  httpClient: AxiosInstance,
  url: string
) {
  const start = (current - 1) * pageSize;
  const end = current * pageSize;
  const {
    data: { data, total },
  } = await httpClient.get(url, {
    params: {
      start,
      end,
    },
  });
  return {
    data,
    total: total || data.length,
  };
}
export const makeBillingURL = async () =>
  (await api.post<string>(`/billing/session`)).data;

export const restDataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = api
): RestDataProvider => ({
  ...baseDataProvider(apiUrl, httpClient as RefineApiClient),
  getList: async ({ resource, pagination }) => {
    const url = `${apiUrl}/${resource}`;

    if (pagination?.current && pagination?.pageSize) {
      return await fetchWithPagination(
        pagination?.current,
        pagination?.pageSize,
        httpClient,
        url
      );
    }

    const { data } = await httpClient.get(url);

    return {
      data,
      total: data.length,
    };
  },
});

export type PromptResponse = {
  message: string;
  error: never;
  sources?: string[];
};

export const promptApi = async (
  prompt: string,
  pastMessages: Message[],
  basedOnDocsOnly = false,
  useActions = false
) => {
  if (!(await canAsk())) {
    throw new Error(
      `You have reached the maximum number of requests. Please upgrade to a paid plan to continue.`
    );
  }

  const messages: APIMessage[] = pastMessages.map((m) => ({
    message: m.message,
    from: m.type === `userMessage` ? { User: {} } : { Bot: {} },
  }));

  const response = (
    await api.post<PromptResponse>(
      `/ask`,
      { messages: messages, basedOnDocsOnly, useActions },
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    )
  ).data;
  incrementRequestCount();
  return response;
};

export const uploadFiles = async (files: Iterable<File> | ArrayLike<File>) => {
  const formData = new FormData();

  const fileList = Array.from(files);
  console.log(`Uploading files: `, fileList.length);
  fileList.forEach((file, index) => {
    formData.append(
      `files`,
      file,
      file.name.replace(/[^a-zA-Z0-9_\. \-]/g, ``)
    );
  });
  const response = (
    await api.post<string[]>(`/upload/`, formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    })
  ).data;
  if (response.length < fileList.length) {
    throw new Error(`Failed to upload all files`);
  }
  incrementDocumentCount();
  return response;
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
      .get<DocResponse[]>(`/search`, {
        headers: {
          "Content-Type": `application/json`,
        },
        params: {
          query,
        },
      })
      .then((res) => {
        try {
        } catch (e) {
          console.log(e);
        }
        return res;
      })
      .catch((e) => {
        console.error(
          `Failed to search docs:`,
          JSON.parse(JSON.stringify(e)),
          e
        );
        log.error(`Failed to search docs:`, JSON.parse(JSON.stringify(e)));
      })
  )?.data;
