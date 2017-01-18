import { Observable, Subject } from 'rxjs';

export interface SqueezedValueAccessor {
  squeezedValue$?: Observable<any> | Subject<any>;
  getSqueezedValue?(): string;
  focus();
}
