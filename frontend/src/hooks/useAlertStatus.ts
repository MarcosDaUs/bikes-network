import { useContext } from 'react';
import { DOMElement } from '../types';
import AlertContext from '../contexts/alert/alertContext';

interface UseAlertStatusReturn {
  showAlertMessage: (message: DOMElement | null) => void;
}

const useAlertStatus = (): UseAlertStatusReturn => {
  const { showAlertHandler } = useContext(AlertContext);

  return {
    showAlertMessage: showAlertHandler,
  };
};

export default useAlertStatus;
