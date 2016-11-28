import { NgModule } from '@angular/core';
import { AppendToDirective } from './directives/append-to.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { LocalizationComponent } from './components/localization.component';

@NgModule({
  imports:      [],
  declarations: [
    AppendToDirective,
    ClickOutsideDirective,
    LocalizationComponent
  ],
  exports:      [
    AppendToDirective,
    ClickOutsideDirective,
    LocalizationComponent
  ]
})
export class SharedModule {
}
