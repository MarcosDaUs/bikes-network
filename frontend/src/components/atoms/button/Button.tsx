import { DOMElement, ButtonType } from '../../../types';
import styles from './Button.module.scss';

export interface ButtonProps {
  type?: ButtonType;
  disabled?: boolean;
  className?: string;
  noHover?: boolean;
  children?: DOMElement;
  onClick?: () => void;
}

export const Button = ({
  type = 'button',
  disabled,
  className,
  noHover,
  children,
  onClick,
}: ButtonProps): JSX.Element => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center w-full rounded-lg px-5 py-2.5 text-center ${
        noHover != null && noHover ? '' : styles.Button__hover
      } ${className ?? ''}`}
    >
      {children ?? ''}
    </button>
  );
};
Button.displayName = 'Button';

export default Button;
