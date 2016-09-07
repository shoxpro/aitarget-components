import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DetailedTargetingModule } from './detailed-targeting/detailed-targeting.module';
import { TargetingSpecService } from './targeting/targeting-spec.service';
import { FbService } from './fb/fb.service';

@NgModule({
  declarations: [],
  imports:      [
    BrowserModule,
    DetailedTargetingModule
  ],
  providers:    [FbService, TargetingSpecService],
  exports:      [BrowserModule, DetailedTargetingModule]
})
export class LibModule {
}
