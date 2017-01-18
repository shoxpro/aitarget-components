import { UpgradeAdapter } from '@angular/upgrade';
import { LibModule } from './lib.module';

export const upgradeAdapter = new UpgradeAdapter(LibModule);

/* tslint:disable:max-line-length */
export { GeoComponent } from './components/targeting/targeting-form/geo/geo.component';
export { DetailedTargetingComponent } from './components/targeting/targeting-form/detailed-targeting/detailed-targeting.component';
/* tslint:enable:max-line-length */
