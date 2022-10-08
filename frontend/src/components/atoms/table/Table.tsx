import { TableData, FieldData, RowData } from '../../../types';

interface TableProps {
  data: TableData;
  className?: string;
}

export const Table = ({ data, className }: TableProps): JSX.Element => {
  return (
    <table className={`w-full text-left ${className ?? ''}`}>
      <thead className='text-base uppercase'>
        <tr>
          {data.thead.fields.map((field: FieldData) => (
            <th
              key={field.id}
              scope='col'
              className={`py-3 px-6 ${field?.className ?? ''}`}
            >
              {field.value}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.tbody.map((row: RowData, index: number) => (
          <tr
            key={row.id}
            className={`text-sm bg-primaryWhite hover:bg-primary hover:text-primaryWhite ${
              index === data.tbody.length - 1 ? '' : 'border-b border-primary'
            } ${row?.className ?? ''}`}
          >
            {row.fields.map((field: FieldData) => (
              <td
                key={field.id}
                className={`py-4 px-6 ${field?.className ?? ''}`}
              >
                {field.value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
Table.displayName = 'Table';

export default Table;
