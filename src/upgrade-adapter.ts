import { UpgradeAdapter } from '@angular/upgrade';
import { forwardRef } from '@angular/core';
import { AppModule } from './app/app.module';

export const upgradeAdapter = new UpgradeAdapter(forwardRef(() => AppModule));
