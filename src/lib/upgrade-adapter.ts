import { UpgradeAdapter } from '@angular/upgrade';
import { LibModule } from './lib.module';

export const upgradeAdapter = new UpgradeAdapter(LibModule);

/* tslint:disable:max-line-length */
export { GeoComponent } from './components/targeting/targeting-form/geo/geo.component';
export { DetailedComponent } from './components/targeting/targeting-form/detailed-targeting/detailed/detailed.component';
/* tslint:enable:max-line-length */
