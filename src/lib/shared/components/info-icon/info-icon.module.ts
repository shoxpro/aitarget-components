import { NgModule } from '@angular/core';
import { InfoIconComponent } from './info-icon.component';
import { InfoIconHeaderComponent } from './info-icon-header.component';
import { InfoIconTextComponent } from './info-icon-text.component';
import { InfoIconImageComponent } from './info-icon-image.component';

@NgModule({
  declarations: [
    InfoIconComponent,
    InfoIconHeaderComponent,
    InfoIconTextComponent,
    InfoIconImageComponent
  ],
  exports:      [
    InfoIconComponent,
    InfoIconHeaderComponent,
    InfoIconTextComponent,
    InfoIconImageComponent
  ]
})
export class InfoIconModule {
}
