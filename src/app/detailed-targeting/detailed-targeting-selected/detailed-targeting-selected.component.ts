import { Component, OnInit } from '@angular/core';
import { TargetingSpecService, TargetingSpec } from '../../targeting/targeting-spec.service';

@Component({
  moduleId: module.id,
  selector: 'detailed-targeting-selected',
  templateUrl: 'detailed-targeting-selected.component.html',
  styleUrls: ['detailed-targeting-selected.component.css']
})
export class DetailedTargetingSelectedComponent implements OnInit {

  public spec: TargetingSpec;

  constructor (private TargetingSpecService: TargetingSpecService) {}

  ngOnInit () {
    this.TargetingSpecService.spec.subscribe((spec: TargetingSpec) => {
      this.spec = spec;
    });
  }

}
