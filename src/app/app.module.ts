import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LibModule } from '../lib/lib.module';
import { routing, appRoutingProviders } from './app.routing';
import { NavbarComponent } from './navbar/navbar.component';
import { DemoComponent } from './demo/demo.component';
import { DemoDetailedTargetingComponent } from './demo-detailed-targeting/demo-detailed-targeting.component';
import { DemoGeoTargetingComponent } from './demo-geo-targeting/demo-geo-targeting.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DemoComponent,
    DemoDetailedTargetingComponent,
    DemoGeoTargetingComponent
  ],
  imports:      [
    routing,
    LibModule
  ],
  providers:    [appRoutingProviders],
  bootstrap:    [AppComponent]
})
export class AppModule {
}
