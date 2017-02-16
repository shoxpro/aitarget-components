import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { FormControlToken } from '../../../../shared/constants/form-control-token';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { TargetingSpec } from '../../interfaces/targeting-spec.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { SqueezedValueAccessor } from '../../../../shared/interfaces/squeeze-value-accessor.inteface';
import { LocalesApiService } from './locales-api/locales-api.service';
import { Locale } from './interfaces/locale.interface';

@Component({
  selector:        'fba-locales',
  templateUrl:     'locales.html',
  styleUrls:       ['locales.scss'],
  providers:       [
    {
      provide:     NG_VALUE_ACCESSOR,
      useExisting: LocalesComponent,
      multi:       true
    },
    {provide: FormControlToken, useExisting: LocalesComponent},
    LocalesApiService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocalesComponent implements ControlValueAccessor, SqueezedValueAccessor, OnInit, OnDestroy {
  _defaultSqueezedValue = '–';
  destroy$              = new Subject();
  squeezedValue$        = new BehaviorSubject(this._defaultSqueezedValue);

  inputValue$ = new Subject<string>();
  locales$: Observable<Array<Locale>>;
  select$     = new Subject<Locale>();
  remove$     = new Subject<Locale>();
  selected$   = new BehaviorSubject<Array<Locale>>([]);

  // ==== value ====
  _value: TargetingSpec = {};

  set value (value: any) {
    this._value = value || this._value;

    this.propagateChange(this._value);
    this.updateSqueezedValue();
  }

  get value () {
    return this._value;
  }

  // ==== value ====

  // noinspection JSMethodCanBeStatic
  /**
   * Will be replaced when implementing registerOnChange
   * @param _ {TargetingSpec}
   */
  propagateChange (_: TargetingSpec) { return _; }

  // ==== implement ControlValueAccessor ====
  writeValue (value: TargetingSpec) {
    this._value = value || this._value;
    this.updateSqueezedValue();
  }

  registerOnChange (fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched () { return; }

  // ==== implement ControlValueAccessor ====

  // ==== implement SqueezedValueAccessor ====

  updateSqueezedValue () {
    this.squeezedValue$.next(this.selected$.getValue()
                                 .map((locale) => locale.name)
                                 .join('; ') || this._defaultSqueezedValue);
  }

  getSqueezedValue () {
    return this.squeezedValue$.getValue();
  }

  focus () { return; }

  // ==== implement SqueezedValueAccessor ====

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.locales$ = this.inputValue$
                        .takeUntil(this.destroy$)
                        .switchMap((inputValue) => {
                          if (!inputValue) {
                            return Observable.of([]);
                          }
                          return this.localesApiService.locales$
                                     .take(1)
                                     .map((locales: Array<Locale>) => {
                                       return locales.filter((locale) => {
                                         return locale.name.toLowerCase()
                                                      .includes(inputValue.toLowerCase());
                                       });
                                     });
                        });

    Observable.merge(
      this.remove$
          .takeUntil(this.destroy$)
          .map((locale: Locale) => {
            return this.selected$.getValue()
                       .filter((selectedLocale) => selectedLocale.key !== locale.key);
          }),
      this.select$
          .takeUntil(this.destroy$)
          .map((locale: Locale) => {
            return [locale].concat(this.selected$.getValue());
          })
    )

              .subscribe((locales: Array<Locale>) => {
                this.selected$.next(locales);

                this.value = Object.assign({}, {
                  locales: locales.map((locale) => locale.key)
                });
              });
  }

  constructor (private localesApiService: LocalesApiService) {}
}
