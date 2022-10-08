import { FieldData } from '../../../types';

interface ListProps {
  items: FieldData[];
  className?: string;
}

export const List = ({ items, className }: ListProps): JSX.Element => {
  return (
    <ul className={`list ${className ?? ''}`}>
      {items.map((item: FieldData): JSX.Element => {
        return (
          <li key={item.id} className={`${item?.className ?? ''}`}>
            {item.value}
          </li>
        );
      })}
    </ul>
  );
};
List.displayName = 'List';

export default List;
