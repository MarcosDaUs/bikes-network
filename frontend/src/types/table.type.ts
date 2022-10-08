import { DOMElement } from './commons.type';

export interface FieldData {
  id: string;
  value: DOMElement;
  className?: string;
}

export interface RowData {
  id: string;
  fields: FieldData[];
  className?: string;
}

export interface TableData {
  thead: RowData;
  tbody: RowData[];
}
