import { NgModule } from '@angular/core';
import { AppendToDirective } from './directives/append-to.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  imports:      [],
  declarations: [
    AppendToDirective,
    ClickOutsideDirective
  ],
  exports:      [
    AppendToDirective,
    ClickOutsideDirective
  ]
})
export class SharedModule {
}
