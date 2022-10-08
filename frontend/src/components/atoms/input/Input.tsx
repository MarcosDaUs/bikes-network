import { useCallback, ChangeEvent } from 'react';
import {
  useController,
  UseControllerProps,
  FieldValues,
} from 'react-hook-form';
import { InputType, InputsEventsHandler } from '../../../types';

interface InputProps<T extends FieldValues> extends UseControllerProps<T> {
  type?: InputType;
  label?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  error?: boolean;
  className?: string;
  onChange?: (
    event: InputsEventsHandler | ChangeEvent<HTMLInputElement>
  ) => void;
  onFocus?: () => void;
  onInput?: () => void;
  onClick?: () => void;
}

export const Input = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  type = 'text',
  label,
  placeholder,
  min,
  max,
  step,
  error,
  className,
  onChange,
  onFocus,
  onInput,
  onClick,
}: InputProps<T>): JSX.Element => {
  const {
    field: { onChange: controllerOnChange, name: controllerName, value },
  } = useController({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  const changeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      controllerOnChange(event);
      if (onChange != null) {
        const dataEvent: InputsEventsHandler = {
          type,
          event,
          name: controllerName,
          value: event.target.value,
        };
        onChange(dataEvent);
      }
    },
    [type, controllerName, onChange, controllerOnChange]
  );

  return (
    <div className={`customInput ${className ?? ''}`}>
      {label != null ? (
        <label
          htmlFor={name}
          className='block mb-2 text-sm font-latoBold text-primaryBlack dark:text-white'
        >
          {label}
        </label>
      ) : null}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        min={min}
        max={max}
        step={step}
        className={`bg-gray-50 text-primary text-latoBold placeholder:!text-latoBold rounded-lg focus:ring-secondary focus-visible:!outline-secondary block w-full p-2.5 ${
          error != null && error
            ? 'border-2 border-red-600'
            : 'border border-gray-300'
        }`}
        onChange={changeHandler}
        onFocus={onFocus}
        onInput={onInput}
        onClick={onClick}
      />
    </div>
  );
};
Input.displayName = 'Input';

export default Input;
