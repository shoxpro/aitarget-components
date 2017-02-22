/* tslint:disable:max-line-length */
import { UpgradeModule } from '@angular/upgrade/src/aot/upgrade_module';
import { downgradeComponent } from '@angular/upgrade/src/aot/downgrade_component';
import { LibModule } from './lib.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { GeoWrapperComponent } from './components/targeting/targeting-form/geo/geo-wrapper.component';
import { DetailedTargetingWrapperComponent } from './components/targeting/targeting-form/detailed-targeting/detailed-targeting-wrapper.component';
import { LocalizationComponent } from './shared/components/localization.component';
/* tslint:enable:max-line-length */

export const NG2 = {
  UpgradeModule,
  downgradeComponent,
  LibModule,
  platformBrowserDynamic,
  GeoWrapperComponent,
  DetailedTargetingWrapperComponent,
  LocalizationComponent
};
