import { SyntheticEvent } from 'react';

export function onFormPromise<T>(
  promise: (event: SyntheticEvent) => Promise<T>
) {
  return (event: SyntheticEvent): void => {
    void promise(event);
  };
}
