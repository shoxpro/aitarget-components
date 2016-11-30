import { Component, Input, Output, EventEmitter, TemplateRef, ContentChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'fba-targeting-form-array',
  template: `
            <div [formGroup]="group">
              <div [formArrayName]="name" class="array-wrapper">
                <!--suppress JSUnresolvedVariable -->
                <div *ngFor="let control of group.controls[name].controls; let i=index; let first=first; let last=last;"
                     class="targeting-form__controls">

                  <template [ngTemplateOutlet]="template" [ngOutletContext]="{$implicit: control}"></template>
                  
                  <fba-close
                    *ngIf="!(first && last)"
                    (onClose)="remove.emit({name: name, i: i})"></fba-close>
                </div>

                <fba-targeting-form-add (add)="add.emit(name)"></fba-targeting-form-add>
              </div>
            </div>
            `,
  styles:   [`
              .targeting-form__controls {
                position: relative;
                padding:  0 30px 10px 0;
              }

              .array-wrapper {
                margin-bottom: 10px;
              }

              [formArrayName] {
                margin-bottom: 10px;
              }

              fba-targeting-form-add {
                margin-top: 10px;
              }
            `]
})
export class TargetingFormArrayComponent {
  @Input() name: string;
  @Input() group: FormGroup;
  @Output() add    = new EventEmitter();
  @Output() remove = new EventEmitter();

  @ContentChild(TemplateRef) template: TemplateRef<any>;
}
