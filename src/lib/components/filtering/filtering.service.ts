import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filter } from './filtering.interface';

@Injectable()
export class FilteringService {
  _filters = new BehaviorSubject<Filter[]>([]);
  filters  = this._filters.asObservable();

  get (): Filter[] {
    return this._filters.getValue();
  }

  set (filters: Filter[]) {
    this._filters.next(filters);
  }
}
