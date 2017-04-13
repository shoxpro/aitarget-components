export interface Filter {
  field: string;
  operator: Operator;
  value?: string | Array<string>;
}

export interface Item {
  id: string;
  name: string;
}

export interface Operator {
  EQUAL?: 'EQUAL';
  NOT_EQUAL?: 'NOT_EQUAL';
  GREATER_THAN?: 'GREATER_THAN';
  GREATER_THAN_OR_EQUAL?: 'GREATER_THAN_OR_EQUAL';
  LESS_THAN?: 'LESS_THAN';
  LESS_THAN_OR_EQUAL?: 'LESS_THAN_OR_EQUAL';
  IN_RANGE?: 'IN_RANGE';
  NOT_IN_RANGE?: 'NOT_IN_RANGE';
  CONTAIN?: 'contains';
  NOT_CONTAIN?: 'not contain';
  IN?: 'is';
  NOT_IN?: 'is not';
  STARTS_WITH?: 'STARTS_WITH';
  ANY?: 'ANY';
  ALL?: 'ALL';
  AFTER?: 'AFTER';
  BEFORE?: 'BEFORE';
  NON?: 'NON';
}

export interface Field {
  name: string;
  type?: string;
  id: string;
  input: 'select' | 'input';
  multiple?: boolean;
  values?: {
    [key: string]: string;
  };
  operator: Operator;
}
