import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Field } from './field.interface';

@Injectable()
export class FieldsService {
  _fields = new BehaviorSubject<Field[]>([]);
  fields  = this._fields.asObservable();

  get (): Field[] {
    return this._fields.getValue();
  }

  set (fields: Field[]) {
    this._fields.next(fields);
  }
}
