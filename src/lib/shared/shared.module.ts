import { NgModule } from '@angular/core';
import { AppendToDirective } from './directives/append-to.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { LocalizationComponent } from './components/localization.component';
import { CloseComponent } from './components/close.component';
import { LinkDirective } from './directives/link.directive';
import { CoreModule } from '../core.module';
import { ValuesPipe } from './pipes/values.pipe';
import { ValidateMessageComponent } from './components/validate-messages.component';
import { ControlSqueezeComponent } from './components/control-squeeze.component';
import { DynamicComponentModule } from 'ng-dynamic';
import { InfoIconComponent } from './components/info-icon/info-icon.component';
import { InfoIconModule } from './components/info-icon/info-icon.module';

@NgModule({
  imports:      [
    CoreModule,
    DynamicComponentModule.forRoot({
      imports: [CoreModule]
    }),
    InfoIconModule
  ],
  declarations: [
    AppendToDirective,
    ClickOutsideDirective,
    LinkDirective,
    ControlSqueezeComponent,
    LocalizationComponent,
    CloseComponent,
    ValuesPipe,
    ValidateMessageComponent
  ],
  exports:      [
    CoreModule,
    InfoIconModule,
    AppendToDirective,
    ClickOutsideDirective,
    LinkDirective,
    ControlSqueezeComponent,
    LocalizationComponent,
    CloseComponent,
    InfoIconComponent,
    ValuesPipe,
    ValidateMessageComponent
  ]
})
export class SharedModule {
}
