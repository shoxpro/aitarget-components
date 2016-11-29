import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'fba-targeting-form-array',
  template: `<div [formGroup]="group">
  <div [formArrayName]="name">
    <div *ngFor="let control of group.controls[name].controls; let i=index; let first=first; let last=last;"
         class="targeting-form__controls">

      <geo-targeting [formControlName]="i" *ngIf="name === 'geoTargetings'"></geo-targeting>
      <!--<ng-content></ng-content>-->
      
      <fba-close
        *ngIf="!(first && last)"
        (onClose)="remove.emit(name, i)"></fba-close>
    </div>

    <fba-targeting-form-add (add)="add.emit(name)"></fba-targeting-form-add>
  </div>
</div>`,
  styles:   [`.targeting-form__controls {
  position: relative;
  padding:  0 30px 10px 0;
}

[formArrayName] {
  margin-bottom: 10px;
}

fba-targeting-form-add {
  margin-top: 10px;
}

`]
})
export class TargetingFormArrayComponent implements OnInit, AfterViewInit {
  @Input() name: string;
  @Input() group: FormGroup;

  @Output() add    = new EventEmitter();
  @Output() remove = new EventEmitter();

  ngOnInit () {
  }

  ngAfterViewInit () {
  }
}
