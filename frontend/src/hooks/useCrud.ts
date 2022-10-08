import { useCallback } from 'react';
import useHttpClient, { UseHttpClientReturn } from './useHttpClient';

export interface UseCrudProps {
  apiUrl?: string;
}

export interface UseCrudReturn<C, R, U, D> {
  isLoading: boolean;
  sendCreateRequest: <S>(data?: S, endPoint?: string) => Promise<C>;
  sendReadRequest: (endPoint?: string) => Promise<R>;
  sendUpdateRequest: <S>(data?: S, endPoint?: string) => Promise<U>;
  sendDeleteRequest: (endPoint?: string) => Promise<D>;
}

export const useCrud = <C, R, U, D>({
  apiUrl,
}: UseCrudProps): UseCrudReturn<C, R, U, D> => {
  const { isLoading, sendRequest }: UseHttpClientReturn = useHttpClient({
    baseURL: apiUrl,
  });

  const sendCreateRequest = useCallback(
    async <S>(data: S, endPoint?: string): Promise<C> => {
      return await sendRequest<C, S>(endPoint ?? '', 'POST', data).then(
        (response: C) => {
          return response;
        },
        (error) => {
          throw error;
        }
      );
    },
    [sendRequest]
  );

  const sendReadRequest = useCallback(
    async (endPoint?: string): Promise<R> => {
      return await sendRequest<R, undefined>(endPoint ?? '', 'GET').then(
        (response: R) => {
          return response;
        },
        (error) => {
          throw error;
        }
      );
    },
    [sendRequest]
  );

  const sendUpdateRequest = useCallback(
    async <S>(data: S, endPoint?: string): Promise<U> => {
      return await sendRequest<U, S>(endPoint ?? '', 'PATCH', data).then(
        (response: U) => {
          return response;
        },
        (error) => {
          throw error;
        }
      );
    },
    [sendRequest]
  );

  const sendDeleteRequest = useCallback(
    async (endPoint?: string): Promise<D> => {
      return await sendRequest<D, undefined>(endPoint ?? '', 'DELETE').then(
        (response: D) => {
          return response;
        },
        (error) => {
          throw error;
        }
      );
    },
    [sendRequest]
  );

  return {
    isLoading,
    sendCreateRequest,
    sendReadRequest,
    sendUpdateRequest,
    sendDeleteRequest,
  };
};

export default useCrud;
