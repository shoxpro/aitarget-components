export interface Field {
  name: string;
  type?: string;
  field: string;
  input: 'select|input';
  multiple?: boolean;
  values?: {
    [key: string]: string;
  };
  operator: Array<string>;
}
