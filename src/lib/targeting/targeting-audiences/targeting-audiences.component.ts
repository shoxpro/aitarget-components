import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AppState } from '../../../app/reducers/index';
import { Store } from '@ngrx/store';
import { TargetingAudiencesService } from './targeting-audiences.service';
import { TargetingService } from '../targeting.service';
import { Subject } from 'rxjs';

@Component({
  selector:        'fba-targeting-audiences',
  templateUrl:     './targeting-audiences.html',
  styleUrls:       ['./targeting-audiences.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TargetingAudiences implements OnInit, OnDestroy {
  destroy$ = new Subject();
  audiences$;
  audienceEditIndex$;

  audiences;
  audienceEditIndex;

  editAudience (index) {
    this.targetingService.setEditAudienceIndex(index);
  }

  updateAudience ({index, audience}) {
    this.targetingAudiencesService.updateAudience(index, audience);
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.audiences$
        .takeUntil(this.destroy$)
        .subscribe((audiences) => {
          this.audiences = audiences;
          this.changeDetectorRef.markForCheck();
          this.changeDetectorRef.detectChanges();
        });
    this.audienceEditIndex$
        .takeUntil(this.destroy$)
        .subscribe((audienceEditIndex) => {
          this.audienceEditIndex = audienceEditIndex;
          this.changeDetectorRef.markForCheck();
          this.changeDetectorRef.detectChanges();
        });
  }

  constructor (private _store: Store<AppState>,
               private changeDetectorRef: ChangeDetectorRef,
               private targetingService: TargetingService,
               private targetingAudiencesService: TargetingAudiencesService) {
    this.audiences$         = this._store.let(TargetingAudiencesService.getModel)
                                  .skip(1); // Skip initial audiences
    this.audienceEditIndex$ = this._store.let(TargetingService.getModel)
                                  .map(({audienceEditIndex}) => audienceEditIndex)
                                  .distinctUntilChanged();
  }
}
