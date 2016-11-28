import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { targetingSpecInitial } from '../targeting-spec.interface';

@Component({
  selector:        'fba-targeting-form',
  templateUrl:     './targeting-form.html',
  styleUrls:       ['./targeting-form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TargetingFormComponent implements OnInit {

  spec = targetingSpecInitial;

  constructor () {}

  ngOnInit () {}
}
