export class DetailedTargetingItem {
  id: string;
  name: string;
  description: string;
  type: string;
  key: string;
  selected: boolean; // Our custom value
  searchable: boolean; // Our custom value
  isParent: boolean; // Our custom value
  children: Array<DetailedTargetingItem>; // Our custom value
  parent: string;
  path: [string];
  /* tslint:disable:variable-name */
  audience_size: number;
  /* tslint:disable:variable-name */
  valid: boolean;
}
