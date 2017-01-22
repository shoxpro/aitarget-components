/* tslint:disable:max-line-length */
import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef, OnDestroy } from '@angular/core';
import { DetailedSelectedService } from './detailed-selected/detailed-selected.service';
import { DetailedApiService } from './detailed-api/detailed-api.service';
import { TargetingSpec } from '../../../interfaces/targeting-spec.interface';
import { detailedSpecInitial, DetailedSpec } from '../../../interfaces/targeting-spec-detailed.interface';
import { DetailedService } from './detailed.service';
import { DetailedModeService } from './detailed-mode/detailed-mode.service';
import { DetailedInfoService } from './detailed-info/detailed-info.service';
import { DetailedDropdownSuggestedService } from './detailed-dropdown-suggested/detailed-dropdown-suggested.service';
import { DetailedDropdownBrowseService } from './detailed-dropdown-browse/detailed-dropdown-browse.service';
import { DetailedInputService } from './detailed-input/detailed-input.service';
import { DetailedSearchService } from './detailed-search/detailed-search.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { DetailedItem } from './detailed-item';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cleanDetailedSpec } from './detailed.constants';
import { FormControlToken } from '../../../../../shared/constants/form-control-token';
import { SqueezedValueAccessor } from '../../../../../shared/interfaces/squeeze-value-accessor.inteface';
/* tslint:enable:max-line-length */

@Component({
  selector:        'fba-detailed',
  templateUrl:     'detailed.component.html',
  styleUrls:       ['detailed.component.scss'],
  providers:       [
    {
      provide:     NG_VALUE_ACCESSOR,
      useExisting: DetailedComponent,
      multi:       true
    },
    {provide: FormControlToken, useExisting: DetailedComponent},
    DetailedApiService, DetailedDropdownSuggestedService,
    DetailedDropdownBrowseService, DetailedInfoService,
    DetailedSelectedService, DetailedModeService, DetailedInputService,
    DetailedService, DetailedSearchService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedComponent implements ControlValueAccessor, SqueezedValueAccessor, OnInit, OnDestroy {
  destroy$       = new Subject();
  squeezedValue$ = new BehaviorSubject('–');

  @Input() adaccountId: string;
  @Input() type: string = 'flexible_spec';

  // ==== value ====
  _value: TargetingSpec = {};

  set value (value: any) {
    this._value = value || this._value;

    this.updateSqueezedValue();
    this.propagateChange(this._value);
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
    if (!value) {
      return;
    }

    this._value = value || this._value;
    this.updateView();

  }

  registerOnChange (fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched () { return; }

  // ==== implement ControlValueAccessor ====

  // ==== implement SqueezedValueAccessor ====

  updateSqueezedValue () {
    this.detailedSelectedService.items
        .take(1)
        .map((items) => {
          return items.reduce((acc, item, index) => {
            let postfix = index === items.length - 1 ? '' : ';&nbsp;';

            acc += `<span style="display: inline-flex">
                        <span>${item.name}${postfix}</span>
                      </span>`;

            return acc;
          }, '');
        })
        .subscribe((value) => {
          this.squeezedValue$.next(value || '–');
        });
  }

  getSqueezedValue () {
    return this.squeezedValue$.getValue();
  }

  focus () {
    // TODO: should be changed after moving architecture to @ngrx/store
    const input = this.elementRef.nativeElement.querySelector('.fba-detailed-input__input');
    setTimeout(() => {
      input.focus();
    });
  }

  // ==== implement SqueezedValueAccessor ====

  constructor (private detailedService: DetailedService,
               private detailedApiService: DetailedApiService,
               private detailedSelectedService: DetailedSelectedService,
               private detailedModeService: DetailedModeService,
               private detailedInfoService: DetailedInfoService,
               private elementRef: ElementRef) {}

  /**
   * Close detailed targeting component
   */
  close = () => {
    this.detailedModeService.set(null);
    this.detailedInfoService.update(null);
  }

  /**
   * Set mode to null if user click outside detailed element
   * @param e
   */
  processOutsideClick = (e) => {
    let targetElement = e.target;

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);

    if (!clickedInside) {
      this.close();
    }
  }

  processKeydown = (e) => {
    // when Escape
    if (e.keyCode === 27) {
      this.close();
    }
  }

  updateView () {
    // Set targetingList array for validation
    let targetingList = [];
    for (let type in detailedSpecInitial) {
      if (this.value[type] && this.value[type].length) {
        this.value[type].forEach((item) => {
          targetingList.push({type: type, id: item.id || item});
        });
      }
    }

    // If targetingList is not empty get validated items and update selected
    if (targetingList.length) {
      this.detailedApiService.validate(targetingList)
          .subscribe((selectedItems: DetailedItem[]) => {
            let validSelectedItems = selectedItems.filter((selectedItem) => selectedItem.valid);
            this.detailedSelectedService.updateSelected(validSelectedItems);
          });
    }
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    if (this.adaccountId) {
      this.detailedApiService.setAdaccount(this.adaccountId);
    } else {
      throw 'Adaccout ID must be provided for this.detailed targeting component!';
    }

    /**
     * Update global Targeting spec when DetailedSpec changes
     */
    this.detailedService.spec
        .takeUntil(this.destroy$)
        // Skip first initialization subject and second with passed spec
        .skip(2)
        .subscribe((detailedSpec: DetailedSpec) => {
          this.value = cleanDetailedSpec(detailedSpec);
        });

    /**
     * Bind/unbind different events depending on detailed-component mode.
     * Mode changeDetectorReflects component's current state.
     */
    this.detailedModeService.mode
        .takeUntil(this.destroy$)
        .subscribe((mode: string) => {
          // Process body clicks in order to close element if clicked outside and element
          window.document.body.removeEventListener('click', this.processOutsideClick);
          window.document.body.removeEventListener('keydown', this.processKeydown);
          if (mode) {
            window.document.body.addEventListener('click', this.processOutsideClick);
            window.document.body.addEventListener('keydown', this.processKeydown);
          }
        });
  }

}
