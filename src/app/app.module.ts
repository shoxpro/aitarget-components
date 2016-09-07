import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DetailedTargetingModule } from './detailed-targeting/detailed-targeting.module';
import { AppComponent } from './app.component';
import { MainModule } from './shared/main.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports:      [
    DetailedTargetingModule,
    BrowserModule,
    MainModule
  ],
  providers:    [],
  bootstrap:    [AppComponent]
})
export class AppModule {
}
