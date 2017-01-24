import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { DetailedDropdownSuggestedService } from './detailed-dropdown-suggested.service';
import { DetailedItem } from '../detailed-item';
import { DetailedInfoService } from '../detailed-info/detailed-info.service';
import { DetailedSelectedService } from '../detailed-selected/detailed-selected.service';
import { DetailedModeService } from '../detailed-mode/detailed-mode.service';
import { DetailedApiService } from '../detailed-api/detailed-api.service';
import { DetailedInputService } from '../detailed-input/detailed-input.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Subject } from 'rxjs';
import { enter$, arrowDown$, arrowUp$ } from '../../../../../../shared/constants/event-streams.constants';
import { isScrolledIntoView } from '../../../../../../shared/utils/isScrolledIntoView';

@Component({
  selector:        'fba-detailed-dropdown-suggested',
  templateUrl:     'detailed-dropdown-suggested.component.html',
  styleUrls:       ['detailed-dropdown-suggested.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DetailedDropdownSuggestedComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  items: DetailedItem[] = [];
  mode;
  activeItemIndex       = 0;
  activeInfo;

  suggest (targetingList: Array<Object> = []) {
    this.detailedApiService.suggest(targetingList);
  }

  constructor (private detailedDropdownSuggestedService: DetailedDropdownSuggestedService,
               private detailedInfoService: DetailedInfoService,
               private detailedSelectedService: DetailedSelectedService,
               private detailedModeService: DetailedModeService,
               private detailedApiService: DetailedApiService,
               private detailedInputService: DetailedInputService,
               private translateService: TranslateService,
               private changeDetectorRef: ChangeDetectorRef) {
  }

  setDropdownInfoItem (item: DetailedItem) {
    this.detailedInfoService.update(item);
  }

  selectItem (item: DetailedItem) {
    let selectedItems = this.detailedSelectedService.get();

    let selectedItemsFiltered = selectedItems.filter(selected => {
      return selected.type === item.type && selected.id === item.id;
    });

    let alreadyAdded: boolean = Boolean(selectedItemsFiltered.length);

    if (!alreadyAdded) {
      selectedItems.unshift(item);
    }

    this.detailedInputService.setTerm('');

    this.detailedSelectedService.updateSelected(selectedItems);
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.detailedDropdownSuggestedService.items
        .takeUntil(this.destroy$)
        .subscribe(items => {
          this.items = items;

          this.changeDetectorRef.markForCheck();
        });

    this.detailedModeService.mode
        .takeUntil(this.destroy$)
        .subscribe((mode: string) => {
          this.mode = mode;

          this.activeItemIndex = 0;

          this.changeDetectorRef.markForCheck();
        });

    /**
     * Load suggested items when list of selected items changes
     */
    this.detailedSelectedService.items
        .takeUntil(this.destroy$)
        .filter(items => items.length > 0)
        .map((items: DetailedItem[]) => {
          return items.map(item => {
            return {
              id:   item.id,
              type: item.type
            };
          });
        })
        .subscribe((targetingList: Array<Object>) => {
          if (this.detailedModeService.get() === 'search') {
            this.detailedModeService.set('suggested');
          }
          this.suggest(targetingList);

          this.changeDetectorRef.markForCheck();
        });

    /**
     * Indicate that info is open. Needed to set proper border-radius to dropdown.
     */
    this.detailedInfoService.item
        .takeUntil(this.destroy$)
        .subscribe((item: DetailedItem) => {
          this.activeInfo = Boolean(item);
          this.changeDetectorRef.markForCheck();
        });

    /**
     * Load suggestions on first init
     */
    this.detailedApiService.suggest();

    arrowUp$
      .takeUntil(this.destroy$)
      .do((e: KeyboardEvent) => e.preventDefault())
      .mapTo(-1)
      .merge(arrowDown$
        .do((e: KeyboardEvent) => e.preventDefault())
        .mapTo(1))
      .filter(() => this.items.length && ['search', 'suggested'].includes(this.mode))
      .subscribe((delta) => {
        this.activeItemIndex += delta;

        if (this.activeItemIndex < 0) {
          this.activeItemIndex = this.items.length - 1;
        }

        if (this.activeItemIndex > this.items.length - 1) {
          this.activeItemIndex = 0;
        }

        // Scroll active row into view
        let activeRow = <HTMLElement>document.querySelector(`.fba-detailed-dropdown-suggested__row:nth-child(${this.activeItemIndex + 1})`);
        let list      = <HTMLElement>document.querySelector('.fba-detailed-dropdown-suggested__list');
        if (activeRow && !isScrolledIntoView(activeRow, list)) {
          list.scrollTop = activeRow.offsetTop;
        }

        this.changeDetectorRef.markForCheck();
        this.changeDetectorRef.detectChanges();
      });

    enter$
      .takeUntil(this.destroy$)
      .do((e: KeyboardEvent) => e.preventDefault())
      .filter(() => this.items.length && ['search', 'suggested'].includes(this.mode))
      .subscribe(() => {
        this.selectItem(this.items[this.activeItemIndex]);
      });

    /**
     * Load suggestions when language changes
     */
    this.translateService.onLangChange
        .takeUntil(this.destroy$)
        .subscribe(() => {
          this.detailedApiService.suggest();
        });
  }

}
