import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef } from '@angular/core';
import { TargetingSpecService } from '../targeting/targeting-spec.service';
import { DetailedTargetingSelectedService } from './detailed-targeting-selected/detailed-targeting-selected.service';
import { DetailedTargetingApiService } from './detailed-targeting-api/detailed-targeting-api.service';
import { TargetingSpec } from '../targeting/targeting-spec.interface';
import { defaultDetailedTargetingSpec } from '../targeting/targeting-spec-detailed.const';
import { DetailedTargetingService } from './detailed-targeting.service';
import { DetailedTargetingSpec } from '../targeting/targeting-spec-detailed.interface';
import * as _ from 'lodash';
import { DetailedTargetingModeService } from './detailed-targeting-mode/detailed-targeting-mode.service';
import { DetailedTargetingInfoService } from './detailed-targeting-info/detailed-targeting-info.service';
import { DetailedTargetingDropdownSuggestedService } from './detailed-targeting-dropdown-suggested/detailed-targeting-dropdown-suggested.service';
import { DetailedTargetingDropdownBrowseService } from './detailed-targeting-dropdown-browse/detailed-targeting-dropdown-browse.service';
import { DetailedTargetingInputService } from './detailed-targeting-input/detailed-targeting-input.service';

@Component({
  selector:        'detailed-targeting',
  templateUrl:     'detailed-targeting.component.html',
  styleUrls:       ['detailed-targeting.component.css'],
  providers:       [
    DetailedTargetingApiService, DetailedTargetingDropdownSuggestedService,
    DetailedTargetingDropdownBrowseService, DetailedTargetingInfoService,
    DetailedTargetingSelectedService, DetailedTargetingModeService, DetailedTargetingInputService,
    DetailedTargetingService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedTargetingComponent implements OnInit {

  @Input('spec') spec: TargetingSpec    = {};
  @Input('onChange') onChange: Function = (spec?) => {};

  constructor (private TargetingSpecService: TargetingSpecService,
               private DetailedTargetingService: DetailedTargetingService,
               private DetailedTargetingApiService: DetailedTargetingApiService,
               private DetailedTargetingSelectedService: DetailedTargetingSelectedService,
               private DetailedTargetingModeService: DetailedTargetingModeService,
               private DetailedTargetingInfoService: DetailedTargetingInfoService,
               private ElementRef: ElementRef) {
  }

  /**
   * Close detailed targeting component
   */
  private close = () => {
    this.DetailedTargetingModeService.set(null);
    this.DetailedTargetingInfoService.update(null);
  };

  /**
   * Set mode to null if user click outside detailed-targeting element
   * @param e
   */
  private processOutsideClick = (e) => {
    let targetElement = e.target;

    const clickedInside = this.ElementRef.nativeElement.contains(targetElement);

    if (!clickedInside) {
      this.close();
    }
  };

  private processKeydown = (e) => {
    // when Escape
    if (e.keyCode === 27) {
      this.close();
    }
  };

  ngOnInit () {
    // Set targetingList array for validation
    let targetingList = [];
    for (let type in defaultDetailedTargetingSpec) {
      if (this.spec[type] && this.spec[type].length) {
        this.spec[type].forEach((id) => {
          targetingList.push({type: type, id: id});
        });
      }
    }

    // If targetingList is not empty get validated items and update selected
    if (targetingList.length) {
      this.DetailedTargetingApiService.validate(targetingList)
          .subscribe((selectedItems) => {
            let validSelectedItems = selectedItems.filter((selectedItem) => selectedItem.valid);
            this.DetailedTargetingSelectedService.updateSelected(validSelectedItems);
          });
    }

    /**
     * Update global Targeting spec when detailedTargetingSpec changes
     */
    this.DetailedTargetingService.spec
    // Skip first initialization subject and second with passed spec
        .skip(2)
        .subscribe((detailedTargetingSpec: DetailedTargetingSpec) => {
          console.log('detailedTargetingSpec: ', detailedTargetingSpec);
          //noinspection TypeScriptUnresolvedFunction
          let newTargetingSpec = Object.assign({}, this.spec, detailedTargetingSpec);
          let cleanSpec        = this.TargetingSpecService.clean(newTargetingSpec);
          this.TargetingSpecService.update(cleanSpec);
        });

    /**
     * Trigger onchange if global Targeting spec changed
     */
    this.TargetingSpecService.spec
    // Skip first initialization subject and second with passed spec
        .skip(1)
        .subscribe((spec: TargetingSpec) => {
          if (!_.isEqual(this.spec, spec)) {
            console.log('Targeting Spec updated: ', spec);
            this.onChange(spec);
          }
        });

    /**
     * Bind/unbind different events depending on detailed-component mode.
     * Mode reflects component's current state.
     */
    this.DetailedTargetingModeService.mode.subscribe((mode: string) => {
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
