import { NgModule } from '@angular/core';
import { AppendToDirective } from './directives/append-to.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { LocalizationComponent } from './components/localization.component';
import { CloseComponent } from './components/fba-close.component';
import { LinkDirective } from './directives/link.directive';
import { CoreModule } from '../core.module';
import { ValuesPipe } from './pipes/values.pipe';
import { ValidateMessageComponent } from './components/validate-messages.component';

@NgModule({
  imports:      [
    CoreModule
  ],
  declarations: [
    AppendToDirective,
    ClickOutsideDirective,
    LinkDirective,
    LocalizationComponent,
    CloseComponent,
    ValuesPipe,
    ValidateMessageComponent
  ],
  exports:      [
    CoreModule,
    AppendToDirective,
    ClickOutsideDirective,
    LinkDirective,
    LocalizationComponent,
    CloseComponent,
    ValuesPipe,
    ValidateMessageComponent
  ]
})
export class SharedModule {
}
