import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import axios, { AxiosInstance, Method, AxiosError, AxiosResponse } from 'axios';

export interface UseHttpClientProps {
  baseURL?: string;
}

export interface UseHttpClientReturn {
  isLoading: boolean;
  error: string | null;
  sendRequest: <T, S>(url: string, method: Method, data?: S) => Promise<T>;
  clearError: () => void;
}

export const useHttpClient = ({
  baseURL,
}: UseHttpClientProps): UseHttpClientReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const axiosInstance: AxiosInstance = useMemo(
    (): AxiosInstance =>
      axios.create({
        baseURL,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
        },
      }),
    [baseURL]
  );

  const activeHttpRequests = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async <T, S>(url: string, method: Method, data?: S): Promise<T> => {
      setIsLoading(true);
      const httpAbortCtrl: AbortController = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);
      return await axiosInstance({
        url,
        method,
        data,
        signal: httpAbortCtrl.signal,
      })
        .then(
          async (response: AxiosResponse<T>) => {
            return response.data;
          },
          async (err) => {
            const axiosError = err as AxiosError<{ message?: string }>;
            const defaultMessage: string = 'unknown';
            if (axiosError.response != null) {
              setError(
                ('message' in axiosError?.response?.data
                  ? axiosError.response.data?.message
                  : undefined) ?? defaultMessage
              );
            }
            setError(defaultMessage);
            throw axiosError;
          }
        )
        .finally(() => {
          activeHttpRequests.current = activeHttpRequests.current.filter(
            (reqCtrl: AbortController): boolean => reqCtrl !== httpAbortCtrl
          );
          setIsLoading(false);
        });
    },
    [axiosInstance]
  );

  const clearError = (): void => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl: AbortController): void =>
        abortCtrl.abort()
      );
    };
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
    clearError,
  };
};

export default useHttpClient;
