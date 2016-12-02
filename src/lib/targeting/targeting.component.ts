import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { TargetingForm } from './targeting-form/targeting-form.interface';
import { TargetingService } from './targeting.service';
import { TargetingActions } from './targeting.actions';
@Component({
  selector:        'fba-targeting',
  templateUrl:     './targeting.component.html',
  styleUrls:       ['./targeting.component.scss'],
  providers:       [
    TargetingActions, TargetingService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TargetingComponent {

  @Input() spec;
  @Output() onChange = new EventEmitter();

  onFormChange (formValue: TargetingForm) {
    this.targetingService.splitFormValue(formValue);
  }

  constructor (private targetingService: TargetingService) {}
}
