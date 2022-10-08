import { useReducer, useCallback } from 'react';
import { DOMElement } from '../../types';
import AlertContext, { AlertContextState } from './alertContext';
import { Alert } from '../../components/atoms';

type ACTIONTYPE =
  | { type: 'ALERT_SHOW'; payload: DOMElement | null }
  | { type: 'ALERT_START'; payload: NodeJS.Timeout | null }
  | { type: 'ALERT_FINISH'; payload: undefined };

const alertInitialState: AlertContextState = {
  message: null,
  show: false,
  loading: false,
  identifier: null,
};

const alertReducer = (
  state: AlertContextState,
  action: ACTIONTYPE
): AlertContextState => {
  switch (action.type) {
    case 'ALERT_SHOW': {
      return {
        ...state,
        show: true,
        message: action.payload,
      };
    }
    case 'ALERT_START': {
      return {
        ...state,
        show: false,
        loading: true,
        identifier: action.payload,
      };
    }
    case 'ALERT_FINISH': {
      return {
        ...state,
        loading: false,
        show: false,
        identifier: null,
      };
    }
    default: {
      return alertInitialState;
    }
  }
};

interface AlertProviderProps {
  children: DOMElement;
}

const AlertProvider = ({ children }: AlertProviderProps): JSX.Element => {
  const [alertState, alertDispatch] = useReducer(
    alertReducer,
    alertInitialState
  );

  const showAlertHandler = useCallback((message: DOMElement | null) => {
    alertDispatch({ type: 'ALERT_SHOW', payload: message });
  }, []);

  const startAlertHandler = useCallback((id: NodeJS.Timeout | null) => {
    alertDispatch({ type: 'ALERT_START', payload: id });
  }, []);

  const finishAlertHandler = useCallback(() => {
    alertDispatch({ type: 'ALERT_FINISH', payload: undefined });
  }, []);

  return (
    <>
      <AlertContext.Provider
        value={{
          message: alertState.message,
          show: alertState.show,
          loading: alertState.loading,
          identifier: alertState.identifier,
          showAlertHandler,
          startAlertHandler,
          finishAlertHandler,
        }}
      >
        {children}
      </AlertContext.Provider>
      <Alert
        {...alertState}
        startAlertHandler={startAlertHandler}
        finishAlertHandler={finishAlertHandler}
      />
    </>
  );
};

export default AlertProvider;
