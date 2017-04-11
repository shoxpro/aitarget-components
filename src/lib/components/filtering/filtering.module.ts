import { NgModule } from '@angular/core';
import { FilteringComponent } from './filtering.component';
import { FilterComponent } from './filter.component';
import { FilterFieldComponent } from './filter-field.component';
import { FilterOperatorComponent } from './filter-operator.component';
import { FilterValueComponent } from './filter-value.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports:      [
    SharedModule
  ],
  declarations: [
    FilteringComponent,
    FilterComponent,
    FilterFieldComponent,
    FilterOperatorComponent,
    FilterValueComponent
  ],
  exports:      [FilteringComponent]
})
export class FilteringModule {
}
