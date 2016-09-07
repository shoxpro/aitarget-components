import { NgModule } from '@angular/core';
import { TargetingSpecService } from '../targeting/targeting-spec.service';
import { FbService } from '../fb/fb.service';

@NgModule({
  providers: [FbService, TargetingSpecService]
})
export class ServiceModule {
}
