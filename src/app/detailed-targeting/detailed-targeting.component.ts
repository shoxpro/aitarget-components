import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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

@Component({
  moduleId: module.id,
  selector: 'detailed-targeting',
  templateUrl: 'detailed-targeting.component.html',
  styleUrls: ['detailed-targeting.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [
    DetailedTargetingSelectedComponent,
    DetailedTargetingInputComponent,
    DetailedTargetingDropdownSuggestedComponent,
    DetailedTargetingDropdownBrowseComponent,
    DetailedTargetingInfoComponent
  ],
  providers: [FbService, DetailedTargetingApiService, DetailedTargetingDropdownSuggestedService,
    DetailedTargetingDropdownBrowseService, DetailedTargetingInfoService, TargetingSpecService,
    DetailedTargetingSelectedService, DetailedTargetingModeService]
})
export class DetailedTargetingComponent implements OnInit {

  constructor (private DetailedTargetingApiService: DetailedTargetingApiService) {}

  ngOnInit () {
    //Load suggested items
    this.DetailedTargetingApiService.suggest();
    setTimeout(() => {
      //Load browse items
      this.DetailedTargetingApiService.browse();
    }, 1000);
  }

}
