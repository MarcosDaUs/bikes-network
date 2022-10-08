import { useState, useCallback } from 'react';

interface UseModalReturn<T> {
  handleCloseModal: (response: boolean | null) => void;
  setContentModal: (content: T) => void;
  showModal: boolean;
  contentModal: T | null;
  responseModal: boolean | null;
}

const useModal = <T>(): UseModalReturn<T> => {
  const [showModalState, setShowModalState] = useState<boolean>(false);
  const [responseState, setResponseState] = useState<boolean | null>(null);
  const [contentState, setContentState] = useState<T | null>(null);

  const handleCloseModal = useCallback((response: boolean | null): void => {
    setShowModalState(false);
    setResponseState(response);
  }, []);

  const setContentModal = useCallback((content: T): void => {
    setResponseState(null);
    setContentState(content);
    setShowModalState(true);
  }, []);

  return {
    handleCloseModal,
    setContentModal,
    showModal: showModalState,
    contentModal: contentState,
    responseModal: responseState,
  };
};

export default useModal;
