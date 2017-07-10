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
import { PluralPipe } from './pipes/plural.pipe';
import { FbDropdownListComponent } from './components/dropdown-list/dropdown-list.component';
import { TickComponent } from './components/tick.component';
import { ArrowDropComponent } from './components/arrow-drop.component';
import { PreloaderDotsComponent } from './components/preloader-dots.component';
import { MdMenuModule } from '@angular/material/menu';
import { FbaMenuComponent } from './components/menu.component';

@NgModule({
  imports:      [
    CoreModule,
    DynamicComponentModule.forRoot({
      imports: [CoreModule]
    }),
    InfoIconModule,
    MdMenuModule.forRoot(),
  ],
  declarations: [
    AppendToDirective,
    ClickOutsideDirective,
    LinkDirective,
    ControlSqueezeComponent,
    LocalizationComponent,
    CloseComponent,
    FbDropdownListComponent,
    TickComponent,
    ValuesPipe,
    PluralPipe,
    ValidateMessageComponent,
    FbaMenuComponent,
    ArrowDropComponent,
    PreloaderDotsComponent
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
    FbDropdownListComponent,
    TickComponent,
    InfoIconComponent,
    ValuesPipe,
    ValidateMessageComponent,
    PreloaderDotsComponent,
    ArrowDropComponent,
    FbaMenuComponent
  ]
})
export class SharedModule {}
