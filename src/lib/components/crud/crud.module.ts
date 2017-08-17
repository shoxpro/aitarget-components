import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CrudComponent } from './crud.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CrudApiService } from './crud-api.service';

@NgModule({
  imports:      [
    SharedModule,
    BrowserModule,
    FormsModule
  ],
  providers:    [CrudApiService],
  declarations: [CrudComponent],
  exports:      [CrudComponent]
})
export class CrudModule {
}
