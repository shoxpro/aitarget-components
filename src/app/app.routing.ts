import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoDetailedTargetingComponent } from './demo-detailed-targeting/demo-detailed-targeting.component';
import { DemoComponent } from './demo/demo.component';
import { DemoGeoTargetingComponent } from './demo-geo-targeting/demo-geo-targeting.component';

const appRoutes: Routes = [
  {path: '', component: DemoComponent},
  {path: 'geo-targeting', component: DemoGeoTargetingComponent},
  {path: 'detailed-targeting', component: DemoDetailedTargetingComponent},
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
