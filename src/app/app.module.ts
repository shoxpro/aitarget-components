import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LibModule } from '../lib/lib.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports:      [
    LibModule
  ],
  providers:    [],
  bootstrap:    [AppComponent]
})
export class AppModule {
}
