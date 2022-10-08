import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { DOMElement } from '../../../types';
import { Backdrop, IcomoonIcon, Button } from '../../atoms';
import styles from './Modal.module.scss';

interface ModalProps {
  show: boolean;
  okText?: string;
  cancelText?: string;
  zIndex: number;
  className?: string;
  children?: DOMElement;
  onClose?: () => void;
  onResponse?: (response: boolean | null) => void;
}

export const Modal = ({
  show,
  okText,
  cancelText,
  zIndex,
  className,
  children,
  onClose,
  onResponse,
}: ModalProps): JSX.Element => {
  const refContainer = useRef<HTMLDivElement>(null);
  const [lineStyleState, setLineStyleState] = useState<React.CSSProperties>({
    left: 0,
    top: 0,
    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
    opacity: show ? '1' : '0',
    zIndex: zIndex + 10,
  });

  useLayoutEffect(() => {
    if (refContainer?.current != null) {
      const tempHeight: number = refContainer.current.offsetHeight;
      const tempWidth: number = refContainer.current.offsetWidth;
      setLineStyleState((prevState: React.CSSProperties) => {
        return {
          ...prevState,
          left: `calc(50% - ${tempWidth / 2}px)`,
          top: `calc(50% - ${tempHeight / 2}px)`,
        };
      });
    }
  }, [refContainer?.current?.offsetHeight, refContainer?.current?.offsetWidth]);

  useEffect(() => {
    setLineStyleState((prevState: React.CSSProperties) => {
      return {
        ...prevState,
        transform: show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0',
        zIndex: zIndex + 10,
      };
    });
  }, [zIndex, show]);
  return (
    <>
      <Backdrop show={show} onClick={onClose} zIndex={zIndex} />
      <div
        className={`modal fixed rounded-lg shadow bg-primaryWhite ${
          styles.modal
        } ${className ?? ''}`}
        style={lineStyleState}
        ref={refContainer}
      >
        <div className='relative'>
          <button
            type='button'
            className='modal__closeButton absolute top-2 right-3 text-primaryBlack bg-transparent hover:text-secondary rounded-lg inline-flex items-center'
            onClick={onClose}
          >
            <IcomoonIcon icon='close-icon' className='text-sm font-latoBold' />
          </button>
          <div className='modal__mainContainer px-8 pb-8 pt-10'>
            {children ?? ''}
            <div className='modal__actionsContainer flex flex-row items-center justify-end space-x-2 pt-2'>
              <Button
                className='text-white bg-secondary hover:bg-primary-700 focus:ring-2 focus:outline-none focus:ring-primaryWhite font-latoBlack'
                onClick={
                  onResponse != null ? () => onResponse(true) : undefined
                }
              >
                {okText ?? ''}
              </Button>
              <Button
                className='text-white bg-secondary hover:bg-primary-700 focus:ring-2 focus:outline-none focus:ring-primaryWhite font-latoBlack'
                onClick={
                  onResponse != null ? () => onResponse(false) : undefined
                }
              >
                {cancelText ?? ''}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
Modal.displayName = 'Modal';

export default Modal;
