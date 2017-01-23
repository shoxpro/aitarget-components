/* tslint:disable:max-line-length */
import { NgModule } from '@angular/core';
import { DetailedComponent } from './detailed.component';
import { DetailedInfoComponent } from './detailed-info/detailed-info.component';
import { DetailedDropdownBrowseComponent } from './detailed-dropdown-browse/detailed-dropdown-browse.component';
import { DetailedDropdownSuggestedComponent } from './detailed-dropdown-suggested/detailed-dropdown-suggested.component';
import { DetailedInputComponent } from './detailed-input/detailed-input.component';
import { DetailedSelectedComponent } from './detailed-selected/detailed-selected.component';
import { DetailedModeComponent } from './detailed-mode/detailed-mode.component';
import { BrowseMultiSelectComponent } from './browse-multi-select/browse-multi-select.component';
import { TypeToHumanPipe } from './type-to-human.pipe';
import { DetailedSearchComponent } from './detailed-search/detailed-search.component';
import { DetailedBrowseComponent } from './detailed-browse/detailed-browse.component';
import { DetailedItemsComponent } from './detailed-items/detailed-items.component';
import { SharedModule } from '../../../../../shared/shared.module';
/* tslint:enable:max-line-length */

@NgModule({
  imports:      [
    SharedModule
  ],
  declarations: [
    DetailedComponent,
    DetailedSelectedComponent,
    DetailedInputComponent,
    DetailedDropdownSuggestedComponent,
    DetailedDropdownBrowseComponent,
    DetailedInfoComponent,
    DetailedModeComponent,
    BrowseMultiSelectComponent,
    DetailedSearchComponent,
    DetailedBrowseComponent,
    DetailedItemsComponent,
    TypeToHumanPipe
  ],
  exports:      [
    DetailedComponent
  ]
})
export class DetailedModule {
}
