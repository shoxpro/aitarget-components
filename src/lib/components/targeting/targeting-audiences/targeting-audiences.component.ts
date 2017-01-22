import {
  Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, OnDestroy, EventEmitter, Output
} from '@angular/core';
import { Store } from '@ngrx/store';
import { TargetingAudiencesService } from './targeting-audiences.service';
import { Subject } from 'rxjs';
import { AudienceService } from '../audience/audience.service';
import { AppState } from '../../../../app/reducers/index';

@Component({
  selector:        'fba-targeting-audiences',
  templateUrl:     'targeting-audiences.html',
  styleUrls:       ['targeting-audiences.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TargetingAudiencesComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  audiences$;
  audienceIndexes$;

  audiences;
  audienceEditIndex;

  @Output() onChange = new EventEmitter();

  editAudience (index) {
    // Order matters! Set index first!
    this.audienceService.setEditAudienceIndex(index);
  }

  updateAudience ({index, audience}) {
    // Order matters! Set index first!
    this.audienceService.setUpdateAudienceIndex(index);
    this.targetingAudiencesService.updateAudience(index, audience);
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.audiences$
        .takeUntil(this.destroy$)
        .switchMap((audiences) => {

          this.onChange.emit(audiences);

          return this.audienceIndexes$
                     .take(1)
                     .filter(({editIndex, updateIndex}) => {
                       return editIndex === null && updateIndex === null;
                     })
                     .mapTo(audiences);
        })
        .subscribe((audiences) => {
          this.audiences = audiences;
          this.changeDetectorRef.markForCheck();
          this.changeDetectorRef.detectChanges();
        });

    this.audienceIndexes$
        .takeUntil(this.destroy$)
        .subscribe(({editIndex}) => {
          this.audienceEditIndex = editIndex;
          this.changeDetectorRef.markForCheck();
          this.changeDetectorRef.detectChanges();
        });
  }

  constructor (private _store: Store<AppState>,
               private changeDetectorRef: ChangeDetectorRef,
               private audienceService: AudienceService,
               private targetingAudiencesService: TargetingAudiencesService) {
    this.audiences$       = this._store.let(TargetingAudiencesService.getModel)
                                .skip(1); // Skip initial audiences
    this.audienceIndexes$ = this._store.let(AudienceService.getModel);
  }
}
