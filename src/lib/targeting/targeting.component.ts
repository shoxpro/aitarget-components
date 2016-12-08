import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { TargetingFormState, targetingFormInitial } from './targeting-form/targeting-form.reducer';
import { TargetingService } from './targeting.service';
import { TargetingApiService } from './targeting-api/geo-targeting-api.service';
import { TargetingAudiencesService } from './targeting-audiences/targeting-audiences.service';
import { TargetingFormService } from './targeting-form/targeting-form.service';
import { TargetingFormActions } from './targeting-form/targeting-form.actions';
import { TargetingAudiencesActions } from './targeting-audiences/targeting-audiences.actions';
import { AudienceService } from './audience/audience.service';
import { AudienceActions } from './audience/audience.actions';

@Component({
  selector:        'fba-targeting',
  templateUrl:     './targeting.component.html',
  styleUrls:       ['./targeting.component.scss'],
  providers:       [
    TargetingApiService, TargetingService,
    TargetingAudiencesActions, TargetingAudiencesService,
    TargetingFormActions, TargetingFormService,
    AudienceActions, AudienceService
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
    this.audienceService.setEditAudienceIndex(null);
    this.audienceService.setUpdateAudienceIndex(null);
  }

  updateAudiences (audiences) {
    // Process audiences value to display
    const audiencesToDisplay = audiences.map((audience) => {
      // Clear audience
      return Object.assign({}, audience, {
        reachestimate:          null,
        targetingsentencelines: null,
        formValue:              null
      });
    })
                                        // Filter if necessary
                                        .filter((/*audience*/) => {
                                          return true; // audience.active;
                                        });

    this.onChange.emit(audiencesToDisplay);
  }

  constructor (private targetingApiService: TargetingApiService,
               private targetingAudiencesService: TargetingAudiencesService,
               private audienceService: AudienceService,
               private targetingFormService: TargetingFormService) {
    this.targetingApiService.setAdaccount(this.adaccountId);
    this.targetingAudiencesService.setAudiences(targetingFormInitial);
  }
}
