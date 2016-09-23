import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
  selector:        'geo-targeting-info',
  templateUrl:     './geo-targeting-info.component.html',
  styleUrls:       ['./geo-targeting-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingInfoComponent implements OnInit, OnDestroy {

  private _subscriptions    = [];
  public message: string;
  public isVisible: boolean = false;

  private updateTemplate () {
    this.ChangeDetectorRef.markForCheck();
    this.ChangeDetectorRef.detectChanges();
  }

  private show () {
    this.isVisible = true;
    this.updateTemplate();
  }

  public hide () {
    this.isVisible = false;
    this.updateTemplate();
  }

  public undoChange () {
    this.GeoTargetingSelectedService.update(
      this.GeoTargetingSelectedService.getPrevItems()
    );
    this.hide();
  }

  constructor (private GeoTargetingSelectedService: GeoTargetingSelectedService,
               private TranslateService: TranslateService,
               private ChangeDetectorRef: ChangeDetectorRef) { }

  ngOnDestroy () {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    this._subscriptions.push(
      this.GeoTargetingSelectedService.items.subscribe((items: GeoTargetingItem[]) => {
        let replacedItems = this.GeoTargetingSelectedService.getReplacedItems();
        let lastAddedItem = items[items.length - 1];
        let fromNames     = replacedItems
          .map((replacedItem) => replacedItem.name)
          .join(', ');

        this.message = this.TranslateService.instant(`geo-targeting-info.MESSAGE`, {
          fromNames: fromNames,
          toName:    lastAddedItem ? lastAddedItem.name : ''
        });

        if (replacedItems.length) {
          this.show();
        } else {
          this.hide();
        }
      })
    );
  }

}
