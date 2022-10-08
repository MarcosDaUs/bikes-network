import { useEffect } from 'react';
import { AlertContextState } from '../../../contexts/alert/alertContext';
import styles from './Alert.module.scss';

export interface AlertProps extends AlertContextState {
  className?: string;
  startAlertHandler: (id: NodeJS.Timeout | null) => void;
  finishAlertHandler: () => void;
}

export const Alert = ({
  message,
  show,
  loading,
  identifier,
  className,
  startAlertHandler,
  finishAlertHandler,
}: AlertProps): JSX.Element => {
  useEffect(() => {
    if (show && !loading) {
      if (identifier != null) clearTimeout(identifier);
      const id: NodeJS.Timeout = setTimeout(() => {
        finishAlertHandler();
      }, 3000);
      startAlertHandler(id);
    }
  }, [show, loading, identifier, startAlertHandler, finishAlertHandler]);
  return (
    <div
      className={`alert fixed bottom-8 right-5 z-50 min-w-[30px] max-w-lg text-center border-2 border-solid border-primaryBlack rounded-xl text-primaryBlack text-sm font-latoBold bg-secondary p-6 ${
        loading ? styles.AlertVisible : styles.AlertHidden
      }`}
    >
      <div>{message}</div>
    </div>
  );
};
Alert.displayName = 'Alert';

export default Alert;
