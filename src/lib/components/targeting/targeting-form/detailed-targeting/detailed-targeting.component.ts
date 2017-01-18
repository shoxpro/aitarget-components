/* tslint:disable:max-line-length */
import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef, OnDestroy } from '@angular/core';
import { DetailedTargetingSelectedService } from './detailed-targeting-selected/detailed-targeting-selected.service';
import { DetailedTargetingApiService } from './detailed-targeting-api/detailed-targeting-api.service';
import { TargetingSpec } from '../../interfaces/targeting-spec.interface';
import { defaultDetailedTargetingSpec } from '../../interfaces/targeting-spec-detailed.const';
import { DetailedTargetingService } from './detailed-targeting.service';
import { DetailedTargetingSpec } from '../../interfaces/targeting-spec-detailed.interface';
import { DetailedTargetingModeService } from './detailed-targeting-mode/detailed-targeting-mode.service';
import { DetailedTargetingInfoService } from './detailed-targeting-info/detailed-targeting-info.service';
import { DetailedTargetingDropdownSuggestedService } from './detailed-targeting-dropdown-suggested/detailed-targeting-dropdown-suggested.service';
import { DetailedTargetingDropdownBrowseService } from './detailed-targeting-dropdown-browse/detailed-targeting-dropdown-browse.service';
import { DetailedTargetingInputService } from './detailed-targeting-input/detailed-targeting-input.service';
import { DetailedTargetingSearchService } from './detailed-targeting-search/detailed-targeting-search.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { DetailedTargetingItem } from './detailed-targeting-item';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cleanDetailedTargetingSpec } from './detailed-targeting.constants';
import { FormControlToken } from '../../../../shared/constants/form-control-token';
import { SqueezedValueAccessor } from '../../../../shared/interfaces/squeeze-value-accessor.inteface';
/* tslint:enable:max-line-length */

@Component({
  selector:    'detailed-targeting',
  templateUrl: 'detailed-targeting.component.html',
  styleUrls:   ['detailed-targeting.component.scss'],
  providers:   [
    {
      provide:     NG_VALUE_ACCESSOR,
      useExisting: DetailedTargetingComponent,
      multi:       true
    },
    {provide: FormControlToken, useExisting: DetailedTargetingComponent},
    DetailedTargetingApiService, DetailedTargetingDropdownSuggestedService,
    DetailedTargetingDropdownBrowseService, DetailedTargetingInfoService,
    DetailedTargetingSelectedService, DetailedTargetingModeService, DetailedTargetingInputService,
    DetailedTargetingService, DetailedTargetingSearchService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedTargetingComponent implements ControlValueAccessor, SqueezedValueAccessor, OnInit, OnDestroy {
  destroy$       = new Subject();
  squeezedValue$ = new BehaviorSubject('–');

  @Input('adaccountId') adaccountId: string;

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
    if (!value) {
      return;
    }

    this._value = value || this._value;
    this.updateView();

  }

  registerOnChange (fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched () {}

  // ==== implement ControlValueAccessor ====

  // ==== implement SqueezedValueAccessor ====

  updateSqueezedValue () {
    this.detailedTargetingSelectedService.items
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
    const input = this.elementRef.nativeElement.querySelector('.detailed-targeting-input__input');
    setTimeout(() => {
      input.focus();
    });
  }

  // ==== implement SqueezedValueAccessor ====

  constructor (private detailedTargetingService: DetailedTargetingService,
               private detailedTargetingApiService: DetailedTargetingApiService,
               private detailedTargetingSelectedService: DetailedTargetingSelectedService,
               private detailedTargetingModeService: DetailedTargetingModeService,
               private detailedTargetingInfoService: DetailedTargetingInfoService,
               private elementRef: ElementRef) {}

  /**
   * Close detailed targeting component
   */
  close = () => {
    this.detailedTargetingModeService.set(null);
    this.detailedTargetingInfoService.update(null);
  };

  /**
   * Set mode to null if user click outside detailed-targeting element
   * @param e
   */
  processOutsideClick = (e) => {
    let targetElement = e.target;

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);

    if (!clickedInside) {
      this.close();
    }
  };

  processKeydown = (e) => {
    // when Escape
    if (e.keyCode === 27) {
      this.close();
    }
  };

  updateView () {
    // Set targetingList array for validation
    let targetingList = [];
    for (let type in defaultDetailedTargetingSpec) {
      if (this.value[type] && this.value[type].length) {
        this.value[type].forEach((item) => {
          targetingList.push({type: type, id: item.id || item});
        });
      }
    }

    // If targetingList is not empty get validated items and update selected
    if (targetingList.length) {
      this.detailedTargetingApiService.validate(targetingList)
          .subscribe((selectedItems: DetailedTargetingItem[]) => {
            let validSelectedItems = selectedItems.filter((selectedItem) => selectedItem.valid);
            this.detailedTargetingSelectedService.updateSelected(validSelectedItems);
          });
    }
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    if (this.adaccountId) {
      this.detailedTargetingApiService.setAdaccount(this.adaccountId);
    } else {
      throw 'Adaccout ID must be provided for this detailed targeting component!';
    }

    /**
     * Update global Targeting spec when detailedTargetingSpec changes
     */
    this.detailedTargetingService.spec
        .takeUntil(this.destroy$)
        // Skip first initialization subject and second with passed spec
        .skip(2)
        .subscribe((detailedTargetingSpec: DetailedTargetingSpec) => {
          this.value = cleanDetailedTargetingSpec(detailedTargetingSpec);
        });

    /**
     * Bind/unbind different events depending on detailed-component mode.
     * Mode changeDetectorReflects component's current state.
     */
    this.detailedTargetingModeService.mode
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
