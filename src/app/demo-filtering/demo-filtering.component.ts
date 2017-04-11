import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector:        'fba-demo-filtering',
  template:        `
                     <div class="buttons">
                       <button md-raised-button
                               (click)="hideGeo = !hideGeo">Toggle</button>
                       <button md-raised-button
                               (click)="showFiltering(true, $event)">Show Filtering</button>
                       <fba-localization></fba-localization>
                     </div>

                     <div class="content">
                       <fba-filtering *ngIf="!hideGeo"
                                      [(ngModel)]="filtering"></fba-filtering>
                     </div>

                     <fba-spec (close)="showFiltering(false, $event)"
                               *ngIf="isSpecVisible"
                               [spec]="filtering"></fba-spec>
                   `,
  styles:          [`
    .buttons {
      margin-bottom: 20px;
    }

    .content {
      margin: 10px 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoFilteringComponent {
  hideGeo       = false;
  isSpecVisible = false;

  filtering = [];

  showFiltering (isVisible, event?) {
    if (event) {
      event.stopPropagation();
    }

    this.isSpecVisible = isVisible;

    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  constructor (private changeDetectorRef: ChangeDetectorRef) { }
}
