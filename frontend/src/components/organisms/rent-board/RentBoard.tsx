import { RentFormData, Rent, FieldData } from '../../../types';
import { RentForm } from '../../molecules';
import { List } from '../../atoms';
import { useMemo } from 'react';

interface RentBoardProps {
  rents: Rent[];
  isRented?: boolean;
  className?: string;
  onSubmit?: (formData: RentFormData, defaultRent?: Rent) => void;
}

export const RentBoard = ({
  rents,
  isRented,
  className,
  onSubmit,
}: RentBoardProps): JSX.Element => {
  const listData: FieldData[] = useMemo(
    (): FieldData[] =>
      ((tempRents: Rent[]): FieldData[] => {
        return tempRents.map((rent: Rent, index: number): FieldData => {
          const startDate: Date = new Date(rent.startDate);
          const endDate: Date = new Date(rent.endDate);
          const item: FieldData = {
            id: `${rent.userId}_${index}`,
            value: (
              <span>{`${startDate.toDateString()} - ${endDate.toDateString()}`}</span>
            ),
          };
          return item;
        });
      })(rents),
    [rents]
  );
  return (
    <div className={`rentBoard ${className ?? ''}`}>
      <RentForm
        title='Rentar la bicicleta'
        onSubmit={onSubmit}
        disabled={isRented}
      />
      <div>
        <List items={listData} />
      </div>
    </div>
  );
};
RentBoard.displayName = 'RentBoard';

export default RentBoard;
