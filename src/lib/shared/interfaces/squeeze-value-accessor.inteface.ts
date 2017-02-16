import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export interface SqueezedValueAccessor {
  squeezedValue$?: Observable<any> | Subject<any>;
  getSqueezedValue?(): string;
  focus();
}
