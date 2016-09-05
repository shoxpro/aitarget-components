import { NgModule } from '@angular/core';
import { DetailedTargetingComponent } from './detailed-targeting.component';
import { DetailedTargetingService } from './detailed-targeting.service';
import { DetailedTargetingInputService } from './detailed-targeting-input/detailed-targeting-input.service';
import { DetailedTargetingModeService } from './detailed-targeting-mode/detailed-targeting-mode.service';
import { DetailedTargetingSelectedService } from './detailed-targeting-selected/detailed-targeting-selected.service';
import { TargetingSpecService } from '../targeting/targeting-spec.service';
import { DetailedTargetingInfoService } from './detailed-targeting-info/detailed-targeting-info.service';
import { DetailedTargetingDropdownBrowseService } from './detailed-targeting-dropdown-browse/detailed-targeting-dropdown-browse.service';
import { DetailedTargetingDropdownSuggestedService } from './detailed-targeting-dropdown-suggested/detailed-targeting-dropdown-suggested.service';
import { DetailedTargetingApiService } from './detailed-targeting-api/detailed-targeting-api.service';
import { FbService } from '../fb/fb.service';
import { DetailedTargetingInfoComponent } from './detailed-targeting-info/detailed-targeting-info.component';
import { DetailedTargetingDropdownBrowseComponent } from './detailed-targeting-dropdown-browse/detailed-targeting-dropdown-browse.component';
import { DetailedTargetingDropdownSuggestedComponent } from './detailed-targeting-dropdown-suggested/detailed-targeting-dropdown-suggested.component';
import { DetailedTargetingInputComponent } from './detailed-targeting-input/detailed-targeting-input.component';
import { DetailedTargetingSelectedComponent } from './detailed-targeting-selected/detailed-targeting-selected.component';
import { DetailedTargetingModeComponent } from './detailed-targeting-mode/detailed-targeting-mode.component';
import { BrowseMultiSelectComponent } from './browse-multi-select/browse-multi-select.component';
import { TypeToHumanPipe } from './type-to-human.pipe';
import { MainModule } from '../shared/main.module';

@NgModule({
  imports:      [
    MainModule
  ],
  declarations: [
    DetailedTargetingComponent,
    DetailedTargetingSelectedComponent,
    DetailedTargetingInputComponent,
    DetailedTargetingDropdownSuggestedComponent,
    DetailedTargetingDropdownBrowseComponent,
    DetailedTargetingInfoComponent,
    DetailedTargetingModeComponent,
    BrowseMultiSelectComponent,
    TypeToHumanPipe
  ],
  providers:    [
    FbService, DetailedTargetingApiService, DetailedTargetingDropdownSuggestedService,
    DetailedTargetingDropdownBrowseService, DetailedTargetingInfoService, TargetingSpecService,
    DetailedTargetingSelectedService, DetailedTargetingModeService, DetailedTargetingInputService,
    DetailedTargetingService
  ],
  exports:      [
    DetailedTargetingComponent
  ]
})
export class DetailedTargetingModule {
}
