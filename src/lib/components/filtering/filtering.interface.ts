import { Operator } from './operator.class';

export interface Filter {
  field: string;
  operator: Operator;
  value?: string;
}
