import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { TargetingFormState, targetingFormInitial } from './targeting-form/targeting-form.reducer';
import { TargetingService } from './targeting.service';
import { TargetingActions } from './targeting.actions';
import { TargetingApiService } from './targeting-api/geo-targeting-api.service';
import { TargetingAudiencesService } from './targeting-audiences/targeting-audiences.service';
import { TargetingFormService } from './targeting-form/targeting-form.service';
import { TargetingFormActions } from './targeting-form/targeting-form.actions';
import { TargetingAudiencesActions } from './targeting-audiences/targeting-audiences.actions';

@Component({
  selector:        'fba-targeting',
  templateUrl:     './targeting.component.html',
  styleUrls:       ['./targeting.component.scss'],
  providers:       [
    TargetingApiService,
    TargetingActions, TargetingService,
    TargetingAudiencesActions, TargetingAudiencesService,
    TargetingFormActions, TargetingFormService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TargetingComponent {
  @Input() spec;
  @Input() adaccountId: string = 'act_944874195534529';
  @Output() onChange           = new EventEmitter();

  onFormChange (formValue: TargetingFormState) {
    this.targetingAudiencesService.setAudiences(formValue);
    this.targetingFormService.setFormValue(formValue);
    this.onChange.emit(formValue);
  }

  constructor (private targetingApiService: TargetingApiService,
               private targetingAudiencesService: TargetingAudiencesService,
               private targetingFormService: TargetingFormService) {
    this.targetingApiService.setAdaccount(this.adaccountId);
    this.targetingAudiencesService.setAudiences(targetingFormInitial);
  }
}
