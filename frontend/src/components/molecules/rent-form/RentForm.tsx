import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RentFormData, Rent, DOMElement } from '../../../types';
import { Input, Button } from '../../atoms';

interface RentFormProps {
  rent?: Rent;
  title?: string;
  disabled?: boolean;
  children?: DOMElement;
  className?: string;
  onSubmit?: (formData: RentFormData, defaultRent?: Rent) => void;
}

export const RentForm = ({
  rent,
  title,
  disabled,
  children,
  className,
  onSubmit,
}: RentFormProps): JSX.Element => {
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<RentFormData>();

  const onSubmitHandler = useCallback(
    (event: React.BaseSyntheticEvent<object, any, any> | undefined): void => {
      void handleSubmit((data: RentFormData): void => {
        if (onSubmit != null) onSubmit(data, rent);
      })(event);
    },
    [rent, handleSubmit, onSubmit]
  );

  useEffect(() => {
    if (rent != null) {
      setValue('startDate', new Date(), {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('endDate', new Date(), {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [rent, setValue]);

  return (
    <form
      className={`rentForm space-y-4 md:space-y-6 ${className ?? ''}`}
      onSubmit={onSubmitHandler}
    >
      {children}
      {title != null && (
        <h3 className='font-latoBold text-lg text-primary text-center'>
          {title ?? ''}
        </h3>
      )}
      <Input
        control={control}
        name='startDate'
        rules={{ required: true }}
        label='Fecha de inicio'
        placeholder='Fecha de inicio'
        defaultValue={new Date()}
        type='datetime-local'
        error={Boolean(errors?.startDate)}
      />
      <Input
        control={control}
        name='endDate'
        rules={{ required: true }}
        label='Fecha de entrega'
        placeholder='Fecha de entrega'
        defaultValue={new Date()}
        type='datetime-local'
        error={Boolean(errors?.endDate)}
      />
      <div className='flex flex-row items-center justify-end space-x-3 pt-2'>
        <Button
          type='submit'
          disabled={disabled}
          className={`text-white bg-secondary font-latoBlack ${
            disabled ? '!bg-gray-200' : ''
          }`}
        >
          Aceptar
        </Button>
      </div>
    </form>
  );
};
RentForm.displayName = 'RentForm';

export default RentForm;
