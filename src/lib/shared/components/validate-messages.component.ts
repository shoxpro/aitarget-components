import { Input, ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector:        'fba-validate-messages',
  template:        `<div *ngIf="control && control.errors">
                      <div *ngFor="let message of control.errors | fbaValues">
                        <span>{{ message }}</span>
                      </div>
                    </div>`,
  styles:          [`
              :host {
                display: block;
                color: #d00303;
                font-size: 10px;
              }
            `],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ValidateMessageComponent {
  @Input() control: FormControl;
}
