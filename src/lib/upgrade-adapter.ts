import { UpgradeAdapter } from '@angular/upgrade';
import { LibModule } from './lib.module';

export const upgradeAdapter = new UpgradeAdapter(LibModule);

/* tslint:disable:max-line-length */
export { GeoTargetingComponent } from './components/targeting/targeting-form/geo-targeting/geo-targeting.component';
export { DetailedTargetingComponent } from './components/targeting/targeting-form/detailed-targeting/detailed-targeting.component';
/* tslint:enable:max-line-length */
