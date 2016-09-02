import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DetailedTargetingSelectedComponent } from './detailed-targeting-selected/';
import { DetailedTargetingInputComponent } from './detailed-targeting-input/';
import { DetailedTargetingDropdownSuggestedComponent } from './detailed-targeting-dropdown-suggested/';
import { DetailedTargetingDropdownBrowseComponent } from './detailed-targeting-dropdown-browse/';
import { DetailedTargetingInfoComponent } from './detailed-targeting-info/';
import { FbService } from '../fb/fb.service';
import { DetailedTargetingDropdownSuggestedService } from './detailed-targeting-dropdown-suggested/detailed-targeting-dropdown-suggested.service';
import { TargetingSpecService } from '../targeting/targeting-spec.service';
import { DetailedTargetingInfoService } from './detailed-targeting-info/detailed-targeting-info.service';
import { DetailedTargetingSelectedService } from './detailed-targeting-selected/detailed-targeting-selected.service';
import { DetailedTargetingModeService } from './detailed-targeting-mode/detailed-targeting-mode.service';
import { DetailedTargetingDropdownBrowseService } from './detailed-targeting-dropdown-browse/detailed-targeting-dropdown-browse.service';
import { DetailedTargetingApiService } from './detailed-targeting-api/detailed-targeting-api.service';
import { DetailedTargetingInputService } from './detailed-targeting-input/detailed-targeting-input.service';
import { TargetingSpec } from '../targeting/targeting-spec.interface';
import { defaultDetailedTargetingSpec } from '../targeting/targeting-spec-detailed.const';
import { DetailedTargetingItem } from './detailed-targeting-item';
import { DetailedTargetingService } from './detailed-targeting.service';
import { DetailedTargetingSpec } from '../targeting/targeting-spec-detailed.interface';
import * as _ from 'lodash';

@Component({
  selector:        'detailed-targeting',
  templateUrl:     'detailed-targeting.component.html',
  styleUrls:       ['detailed-targeting.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives:      [
    DetailedTargetingSelectedComponent,
    DetailedTargetingInputComponent,
    DetailedTargetingDropdownSuggestedComponent,
    DetailedTargetingDropdownBrowseComponent,
    DetailedTargetingInfoComponent
  ],
  providers:       [FbService, DetailedTargetingApiService, DetailedTargetingDropdownSuggestedService,
    DetailedTargetingDropdownBrowseService, DetailedTargetingInfoService, TargetingSpecService,
    DetailedTargetingSelectedService, DetailedTargetingModeService, DetailedTargetingInputService,
    DetailedTargetingService]
})
export class DetailedTargetingComponent implements OnInit {

  @Input('spec') spec: TargetingSpec    = {};
  @Input('onChange') onChange: Function = () => {};

  constructor (private TargetingSpecService: TargetingSpecService,
               private DetailedTargetingService: DetailedTargetingService,
               private DetailedTargetingApiService: DetailedTargetingApiService,
               private DetailedTargetingSelectedService: DetailedTargetingSelectedService) {
  }

  ngOnInit () {
    // Set targetingList array for validation
    let targetingList = [];
    for (let type in defaultDetailedTargetingSpec) {
      if (this.spec[type] && this.spec[type].length) {
        this.spec[type].forEach((item: DetailedTargetingItem) => {
          targetingList.push({ type: type, id: item.id });
        });
      }
    }

    // If targetingList is not empty get validated items and update selected
    if (targetingList.length) {
      this.DetailedTargetingApiService.validate(targetingList).subscribe((selectedItems) => {
        this.DetailedTargetingSelectedService.updateSelected(selectedItems);
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
  }

}
