import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { TargetingForm } from './targeting-form/targeting-form.interface';
import { TargetingService } from './targeting.service';
import { TargetingActions } from './targeting.actions';
import { Subject } from 'rxjs';
import { AppState } from '../../app/reducers/index';
import { Store } from '@ngrx/store';

@Component({
  selector:        'fba-targeting',
  templateUrl:     './targeting.component.html',
  styleUrls:       ['./targeting.component.scss'],
  providers:       [
    TargetingActions, TargetingService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TargetingComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  form$;

  @Input() spec;
  @Output() onChange = new EventEmitter();

  onFormChange (formValue: TargetingForm) {
    this.targetingService.splitFormValue(formValue);
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
  }

  constructor (private _store: Store<AppState>,
               private targetingService: TargetingService) {
    this.form$ = this._store.let(TargetingService.getModel)
                     .takeUntil(this.destroy$)
                     .map(({formValue}) => {
                       return formValue;
                     })
                     .distinctUntilChanged();
  }
}
