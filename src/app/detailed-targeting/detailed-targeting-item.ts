export class DetailedTargetingItem {
  id: string;
  name: string;
  description: string;
  type: string;
  key: string;
  selected: boolean;//Our custom value
  parent: string;
  path: [string];
  audience_size: number;
}
