import { UpgradeAdapter } from '@angular/upgrade';
import { LibModule } from './lib.module';

export const upgradeAdapter = new UpgradeAdapter(LibModule);

export { GeoTargetingComponent } from './geo-targeting/geo-targeting.component';
export { DetailedTargetingComponent } from './detailed-targeting/detailed-targeting.component';
