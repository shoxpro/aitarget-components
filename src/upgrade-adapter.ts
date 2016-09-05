import { UpgradeAdapter } from '@angular/upgrade';
import { forwardRef } from '@angular/core';
import { DetailedTargetingModule } from './app/detailed-targeting/detailed-targeting.module';

export const upgradeAdapter = new UpgradeAdapter(forwardRef(() => DetailedTargetingModule));
