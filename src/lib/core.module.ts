import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from 'ng2-translate/ng2-translate';
import { CustomLoader } from './translate/custom-loader.class';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forRoot({provide: TranslateLoader, useClass: CustomLoader})
  ],
  exports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ]
})
export class CoreModule {
}
