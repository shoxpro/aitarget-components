import { UpgradeAdapter } from '@angular/upgrade';
import { forwardRef } from '@angular/core';
import { LibModule } from './lib.module';

export const upgradeAdapter = new UpgradeAdapter(forwardRef(() => LibModule));
