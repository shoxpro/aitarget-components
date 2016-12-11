import { NgModule } from '@angular/core';
import { LocalesSearchComponent } from './locales-search/locales-search';
import { LocalesComponent } from './locales.component';
import { SharedModule } from '../../../../shared/shared.module';
import { LocalesSelectedComponent } from './locales-selected/locales-selected.component';
import { LocalesDropdownComponent } from './locales-dropdown/locales-dropdown.component';

@NgModule({
  imports:      [SharedModule],
  declarations: [
    LocalesComponent,
    LocalesSelectedComponent,
    LocalesSearchComponent,
    LocalesDropdownComponent
  ],
  exports:      [LocalesComponent]
})
export class LocalesModule {
}
