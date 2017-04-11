import { Operator } from './operator.enum';

export interface Filter {
  field: string;
  operator: Operator;
  value?: string;
}
