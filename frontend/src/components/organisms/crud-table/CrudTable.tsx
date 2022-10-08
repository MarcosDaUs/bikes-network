import { useMemo } from 'react';
import { TableData, RowData, FieldData, DOMElement } from '../../../types';
import { IconButton } from '../../molecules';
import { IcomoonIcon, Button, Table } from '../../atoms';

export interface CrudTableActionProps<T extends object> {
  id: string;
  content: DOMElement;
  callback: (item: T, actionId: string) => void;
  className?: string;
}

interface CrudTableProps<T extends object> {
  data: T[];
  headersKeys: string[];
  extraActions?: Array<CrudTableActionProps<T>>;
  className?: string;
  createOnClick?: () => void;
  readOnClick?: (item: T) => void;
  updateOnClick?: (item: T) => void;
  deleteOnClick?: (item: T) => void;
}

export const CrudTable = <T extends object>({
  data,
  headersKeys,
  extraActions,
  className,
  createOnClick,
  readOnClick,
  updateOnClick,
  deleteOnClick,
}: CrudTableProps<T>): JSX.Element => {
  const crudData: TableData | null = useMemo(
    (): TableData | null =>
      ((tempData: T[], tempHeadersKeys: string[]): TableData | null => {
        if (tempHeadersKeys.length > 0) {
          const theadData: RowData = {
            id: 'header',
            fields: [
              ...tempHeadersKeys.map((key: string): FieldData => {
                return {
                  id: key,
                  value: key,
                  className: 'text-center font-latoBold',
                };
              }),
              {
                id: 'actions',
                value: 'Acciones',
                className: 'text-center font-latoBold',
              },
            ],
            className: '',
          };
          const tbodyData: RowData[] = [];
          tempData?.forEach((row: T, index: number) => {
            const rowData: RowData = {
              id: `${index}`,
              fields: [],
              className: '',
            };
            tempHeadersKeys.forEach((key: string) => {
              if (key in row) {
                type RowKey = keyof typeof row;
                const rowKey = key as RowKey;
                rowData.fields.push({
                  id: key,
                  value: (row[rowKey] ?? '') as string,
                  className: '',
                });
              }
            });
            rowData.fields.push({
              id: 'actions',
              value: (
                <>
                  <IconButton
                    icon='location-icon'
                    onClick={() =>
                      readOnClick != null ? readOnClick(row) : undefined
                    }
                  />
                  <IconButton
                    icon='edit-icon'
                    onClick={() =>
                      updateOnClick != null ? updateOnClick(row) : undefined
                    }
                  />
                  <IconButton
                    icon='delete-icon'
                    onClick={() =>
                      deleteOnClick != null ? deleteOnClick(row) : undefined
                    }
                  />
                  {extraActions?.map((action: CrudTableActionProps<T>) => (
                    <Button
                      key={`action_${action.id}_${index}`}
                      className={`crudTable__actionButton ${action.id} ${
                        action?.className ?? ''
                      }`}
                      onClick={() => action.callback(row, action.id)}
                    >
                      {action.content}
                    </Button>
                  ))}
                </>
              ),
              className: `flex flex-row items-center space-x-1.5`,
            });
            tbodyData.push(rowData);
          });
          return {
            thead: theadData,
            tbody: tbodyData,
          };
        }
        return null;
      })(data, headersKeys),
    [data, headersKeys, extraActions, readOnClick, updateOnClick, deleteOnClick]
  );

  return (
    <div
      className={`crudTable overflow-x-auto relative shadow-lg sm:rounded-lg ${
        className ?? ''
      }`}
    >
      <div className='flex justify-between items-center pb-4'>
        <Button
          onClick={createOnClick}
          className='rounded-t-lg rounded-b-none bg-secondary text-primaryBlack font-latoBlack'
        >
          <IcomoonIcon icon='plus-icon text-xs' />
          <span className='pl-2 block'>Añadir nueva bicicleta</span>
        </Button>
      </div>
      {!(crudData == null) && <Table data={crudData} />}
    </div>
  );
};
CrudTable.displayName = 'CrudTable';

export default CrudTable;
