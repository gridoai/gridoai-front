import { useCallback, useEffect, useState } from "react";

type FetchDataType = {
  data: any;
  error: Error | null;
  cancel: () => void;
};

export const useStreamFetch = (
  url: string,
  options: RequestInit
): FetchDataType => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  const abortController = new AbortController();
  const signal = abortController.signal;

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url, { ...options, signal });
      const reader = response.body?.getReader();

      if (reader) {
        const decoder = new TextDecoder(`utf-8`);
        let result = ``;

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: !done });
          result += chunk;
          setData(result);
        }
      } else {
        setError(new Error(`No reader found`));
      }
    } catch (err: { name: string }) {
      if (err.name !== `AbortError`) {
        setError(err);
      }
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();

    return () => {
      abortController.abort();
    };
  }, [fetchData]);

  const cancel = () => abortController.abort();

  return { data, error, cancel };
};
