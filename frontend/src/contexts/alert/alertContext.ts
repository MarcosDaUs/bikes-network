import { createContext } from 'react';
import { DOMElement } from '../../types';

export interface AlertContextState {
  message: DOMElement | null;
  show: boolean;
  loading: boolean;
  identifier: NodeJS.Timeout | null;
}

export interface AlertContextInterface extends AlertContextState {
  showAlertHandler: (message: DOMElement | null) => void;
  startAlertHandler: (id: NodeJS.Timeout | null) => void;
  finishAlertHandler: () => void;
}

const AlertContext = createContext<AlertContextInterface>({
  message: null,
  show: false,
  loading: false,
  identifier: null,
  showAlertHandler: () => {},
  startAlertHandler: () => {},
  finishAlertHandler: () => {},
});

export default AlertContext;
