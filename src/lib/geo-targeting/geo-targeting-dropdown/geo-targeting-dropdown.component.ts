import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { GeoTargetingDropdownService } from './geo-targeting-dropdown.service';

@Component({
  selector:        'geo-targeting-dropdown',
  templateUrl:     './geo-targeting-dropdown.component.html',
  styleUrls:       ['./geo-targeting-dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingDropdownComponent implements OnInit, OnDestroy {

  private subscriptions = [];
  private items;
  private isOpen;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  private updateTemplate () {
    this.ref.markForCheck();
    this.ref.detectChanges();
  }

  /**
   * Select location handler
   * @param item
   */
  public selectItem (item) {
    console.log(`Select item:`, item);
  }

  constructor (private GeoTargetingDropdownService: GeoTargetingDropdownService,
               private ref: ChangeDetectorRef) { }

  ngOnDestroy () {
    // Unsubscribe from all Observables
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    /**
     * Update items list and open dropdown if has items
     */
    this.subscriptions.push(
      this.GeoTargetingDropdownService.items.subscribe((items) => {
        this.items = items;
        if (items && items.length) {
          this.GeoTargetingDropdownService.open();
        }
        this.updateTemplate();
      })
    );

    /**
     * Update isOpen flag
     */
    this.subscriptions.push(
      this.GeoTargetingDropdownService.isOpen.subscribe((isOpen: boolean) => {
        this.isOpen = isOpen;
        this.updateTemplate();
      })
    );
  }

}
