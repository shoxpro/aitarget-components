import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from 'ng2-translate/ng2-translate';
import { CustomLoader } from './translate/custom-loader.class';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TranslateModule.forRoot({provide: TranslateLoader, useClass: CustomLoader})
  ],
  exports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TranslateModule
  ]
})
export class CoreModule {
}
