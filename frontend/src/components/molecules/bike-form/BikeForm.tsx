import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BikeFormData, Bike, DOMElement, Location } from '../../../types';
import { Input, Button } from '../../atoms';

interface BikeFormProps {
  bike?: Bike;
  location?: Location;
  title?: string;
  children?: DOMElement;
  className?: string;
  onSubmit?: (formData: BikeFormData, defaultBike?: Bike) => void;
  cancelSubmit?: () => void;
}

export const BikeForm = ({
  bike,
  location,
  title,
  children,
  className,
  onSubmit,
  cancelSubmit,
}: BikeFormProps): JSX.Element => {
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<BikeFormData>();

  const onSubmitHandler = useCallback(
    (event: React.BaseSyntheticEvent<object, any, any> | undefined): void => {
      void handleSubmit((data: BikeFormData): void => {
        if (onSubmit != null) onSubmit(data, bike);
      })(event);
    },
    [bike, handleSubmit, onSubmit]
  );

  useEffect(() => {
    if (bike != null) {
      setValue('model', bike.model, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('color', bike.color, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
    if (location != null) {
      setValue('longitude', location.longitude, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('latitude', location.latitude, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [bike, location, setValue]);

  return (
    <form
      className={`bikeForm space-y-4 md:space-y-6 ${className ?? ''}`}
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
        name='model'
        rules={{ required: true, maxLength: 50, min: 1 }}
        defaultValue=''
        label='Modelo'
        placeholder='Modelo'
        error={Boolean(errors?.model)}
      />
      <Input
        control={control}
        name='color'
        rules={{ required: true, maxLength: 50, min: 1 }}
        defaultValue=''
        label='Color'
        placeholder='Color'
        error={Boolean(errors?.color)}
      />
      <Input
        control={control}
        name='longitude'
        rules={{ required: true, min: -180, max: 180 }}
        label='Longitud'
        placeholder='Longitud'
        defaultValue={0}
        min={-180}
        max={180}
        step={0.000001}
        type='number'
        error={Boolean(errors?.longitude)}
      />
      <Input
        control={control}
        name='latitude'
        rules={{ required: true, min: -90, max: 90 }}
        defaultValue={0}
        label='Latitud'
        placeholder='Latitud'
        min={-90}
        max={90}
        step={0.000001}
        type='number'
        error={Boolean(errors?.latitude)}
      />
      <div className='flex flex-row items-center justify-end space-x-3 pt-2'>
        <Button
          type='submit'
          className='text-white bg-secondary font-latoBlack'
        >
          Aceptar
        </Button>
        <Button
          className='text-white bg-secondary font-latoBlack'
          onClick={cancelSubmit}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};
BikeForm.displayName = 'BikeForm';

export default BikeForm;
