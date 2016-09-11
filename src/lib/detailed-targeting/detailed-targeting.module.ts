import { NgModule } from '@angular/core';
import { DetailedTargetingComponent } from './detailed-targeting.component';
import { DetailedTargetingInfoComponent } from './detailed-targeting-info/detailed-targeting-info.component';
import { DetailedTargetingDropdownBrowseComponent } from './detailed-targeting-dropdown-browse/detailed-targeting-dropdown-browse.component';
import { DetailedTargetingDropdownSuggestedComponent } from './detailed-targeting-dropdown-suggested/detailed-targeting-dropdown-suggested.component';
import { DetailedTargetingInputComponent } from './detailed-targeting-input/detailed-targeting-input.component';
import { DetailedTargetingSelectedComponent } from './detailed-targeting-selected/detailed-targeting-selected.component';
import { DetailedTargetingModeComponent } from './detailed-targeting-mode/detailed-targeting-mode.component';
import { BrowseMultiSelectComponent } from './browse-multi-select/browse-multi-select.component';
import { TypeToHumanPipe } from './type-to-human.pipe';
import { CoreModule } from '../core.module';
import { DetailedTargetingSearchComponent } from './detailed-targeting-search/detailed-targeting-search.component';
import { DetailedTargetingBrowseComponent } from './detailed-targeting-browse/detailed-targeting-browse.component';
import { DetailedTargetingItemsComponent } from './detailed-targeting-items/detailed-targeting-items.component';

@NgModule({
  imports:      [
    CoreModule
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
    DetailedTargetingSearchComponent,
    DetailedTargetingBrowseComponent,
    DetailedTargetingItemsComponent,
    TypeToHumanPipe
  ],
  exports:      [
    DetailedTargetingComponent
  ]
})
export class DetailedTargetingModule {
}
