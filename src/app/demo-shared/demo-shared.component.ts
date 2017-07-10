import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';


@Component({
  selector:        'fba-demo-shared',
  templateUrl:     'demo-shared.component.html',
  styleUrls:       ['demo-shared.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoSharedComponent {
  menuItems = [
    {
      id:   '1',
      name: 'one'
    },
    {
      id:   '2',
      name: 'two'
    },
    {
      id:   '3',
      name: 'three'
    },
    {
      id:   '4',
      name: 'four'
    },
    {
      id:   '5',
      name: 'five'
    }
  ];
  menuButtonName = 'Bulk edit';
  selectedItem: string;
  isSpecVisible = false;
  hideMenu = false;
  showSpec (isVisible, event?) {
    if (event) {
      event.stopPropagation();
    }

    this.isSpecVisible = isVisible;

    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }
  onClick (selectedItem) {
    this.selectedItem = selectedItem;
  }

  constructor (private changeDetectorRef: ChangeDetectorRef) { }
}
