import { Component, OnInit, Injectable } from '@angular/core';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class DetailedTargetingInfoService {

  private _item = new Subject<DetailedTargetingItem>();
  public item = this._item.asObservable();

  public update (item: DetailedTargetingItem) {
    this._item.next(item);
  };

  constructor () {}

}

@Component({
  moduleId: module.id,
  selector: 'detailed-targeting-info',
  templateUrl: 'detailed-targeting-info.component.html',
  styleUrls: ['detailed-targeting-info.component.css'],
})

export class DetailedTargetingInfoComponent implements OnInit {

  public item: DetailedTargetingItem;

  constructor (private DetailedTargetingInfoService: DetailedTargetingInfoService) {}

  public getDescription (item: DetailedTargetingItem) {
    let description: string;
    let lastCrumb = item.path[item.path.length - 1];
    switch (item.type) {
      case 'interests':
        description = `People who have expressed an interest in or like pages related to <i>${lastCrumb}</i>`;
        break;
      default:
        description = `People who listed their ${item.type} as <i>${lastCrumb}</i> in their Facebook profile.`;
    }
    return description;
  }

  ngOnInit () {
    this.DetailedTargetingInfoService.item.subscribe((item: DetailedTargetingItem) => {
      this.item = item;
    });
  }

}
