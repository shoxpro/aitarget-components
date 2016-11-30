import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'fba-targeting-form-array',
  template: `
            <div [formGroup]="group">
              <div [formArrayName]="name" class="array-wrapper">
                <!--suppress JSUnresolvedVariable -->
                <div *ngFor="let control of group.controls[name].controls; let i=index; let first=first; let last=last;"
                     class="targeting-form__controls">

                  <!--suppress UnnecessaryLabelJS -->
                  <ng-container *dynamicComponent="controlTemplate; context: {control: control}"></ng-container>

                  <fba-close
                    *ngIf="!(first && last)"
                    (onClose)="remove.emit(name, i)"></fba-close>
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

  // ==== attributes ====
  _controlAttrs: string = '';

  @Input()
  set controlAttrs (attrs = {}) {
    this._controlAttrs = '';
    for (let attr in attrs) {
      if (attrs.hasOwnProperty(attr)) {
        this._controlAttrs += `${attr}="${attrs[attr]}"`;
      }
    }
  }

  get controlAttrs () {
    return this._controlAttrs;
  }

  // ==== attributes ====

  // ==== control to render ====
  _controlTemplate: string = 'input';

  @Input('control')
  set controlTemplate (tag) {
    this._controlTemplate = `<${tag} ${this.controlAttrs} [formControl]="control"></${tag}>`;
  }

  get controlTemplate () {
    return this._controlTemplate;
  }

  // ==== control to render ====
}
