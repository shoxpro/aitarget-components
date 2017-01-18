import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector:    'geo-targeting-pin',
  templateUrl: 'geo-targeting-pin.component.html',
  styleUrls:   ['geo-targeting-pin.component.scss']
})
export class GeoTargetingPinComponent implements OnInit {

  @Input('excluded') excluded: boolean = false;

  constructor () { }

  ngOnInit () {
  }

}
