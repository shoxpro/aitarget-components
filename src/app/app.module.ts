import { NgModule } from '@angular/core';

import { DetailedTargetingModule } from './detailed-targeting/detailed-targeting.module';

import { AppComponent } from './app.component';
import { MainModule } from './shared/main.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    DetailedTargetingModule,
    MainModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
