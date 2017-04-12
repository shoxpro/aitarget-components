import { Operator } from './operator.interface';

export interface Field {
  name: string;
  type?: string;
  id: string;
  input: 'select' | 'input';
  multiple?: boolean;
  values?: {
    [key: string]: string;
  };
  operator: Array<Operator>;
}
