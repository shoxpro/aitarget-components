import { Operator } from './operator.enum';

export interface Filter {
  field: string;
  value: string;
  operator: Operator;
}
