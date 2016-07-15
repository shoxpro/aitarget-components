import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DetailedTargetingSelectedComponent } from './detailed-targeting-selected/';
import { DetailedTargetingInputComponent } from './detailed-targeting-input/';
import { DetailedTargetingDropdownDefaultComponent } from './detailed-targeting-dropdown-default/';
import { DetailedTargetingDropdownBrowseComponent } from './detailed-targeting-dropdown-browse/';
import { DetailedTargetingInfoComponent } from './detailed-targeting-info/';
import { FbService } from '../fb/fb.service';
import { DetailedTargetingDropdownDefaultService } from './detailed-targeting-dropdown-default/detailed-targeting-dropdown-default.service';
import { TargetingSpecService } from '../targeting/targeting-spec.service';
import { DetailedTargetingInfoService } from './detailed-targeting-info/detailed-targeting-info.service';
import { DetailedTargetingSelectedService } from './detailed-targeting-selected/detailed-targeting-selected.service';

@Component({
  moduleId: module.id,
  selector: 'detailed-targeting',
  templateUrl: 'detailed-targeting.component.html',
  styleUrls: ['detailed-targeting.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [
    DetailedTargetingSelectedComponent,
    DetailedTargetingInputComponent,
    DetailedTargetingDropdownDefaultComponent,
    DetailedTargetingDropdownBrowseComponent,
    DetailedTargetingInfoComponent
  ],
  providers: [FbService, DetailedTargetingDropdownDefaultService, DetailedTargetingInfoService, TargetingSpecService,
    DetailedTargetingSelectedService]
})
export class DetailedTargetingComponent implements OnInit {

  constructor () {}

  ngOnInit () { }

}
