import { Component, Input } from '@angular/core';

@Component({
  selector:    'fba-geo-pin',
  templateUrl: 'geo-pin.component.html',
  styleUrls:   ['geo-pin.component.scss']
})
export class GeoPinComponent {

  @Input('excluded') excluded: boolean = false;
}
