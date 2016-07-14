import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { DetailedTargetingDropdownDefaultService } from './detailed-targeting-dropdown-default.service';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { DetailedTargetingInfoService } from '../detailed-targeting-info/detailed-targeting-info.component';
import { TargetingSpecService } from '../../targeting/targeting-spec.service';

@Component({
  moduleId: module.id,
  selector: 'detailed-targeting-dropdown-default',
  templateUrl: 'detailed-targeting-dropdown-default.component.html',
  styleUrls: ['detailed-targeting-dropdown-default.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DetailedTargetingDropdownDefaultComponent implements OnInit {

  public items: DetailedTargetingItem[];

  constructor (private DetailedTargetingDropdownDefaultService: DetailedTargetingDropdownDefaultService,
               private DetailedTargetingInfoService: DetailedTargetingInfoService,
               private TargetingSpecService: TargetingSpecService,
               private ref: ChangeDetectorRef) {}

  public setDropdownInfoItem (item: DetailedTargetingItem) {
    this.DetailedTargetingInfoService.update(item);
  }

  public selectItem (item: DetailedTargetingItem) {
    let spec = this.TargetingSpecService.get();

    spec[item.type] = spec[item.type] || [];

    let alreadyAdded: boolean = Boolean(spec[item.type].filter(selected => selected.id === item.id).length);

    if (!alreadyAdded) {
      spec[item.type].push({id: item.id, name: item.name});
    }

    this.TargetingSpecService.update(spec);
  }

  ngOnInit () {
    this.DetailedTargetingDropdownDefaultService.items.subscribe(items => {
      this.items = items;

      this.ref.markForCheck();
      this.ref.detectChanges();
    });
  }

}
