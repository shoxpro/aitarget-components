import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FIELDS } from './fields.constant';
import { Filter } from '../../lib/components/filtering/filtering.interface';

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
                                      [fields]="fields"
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

  filtering: Array<Filter> = [{field: 'campaign_name', operator: ''}];
  fields    = FIELDS;

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
