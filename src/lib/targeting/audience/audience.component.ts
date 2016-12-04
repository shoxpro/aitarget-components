import {
  Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, ViewEncapsulation, OnDestroy
} from '@angular/core';
import { AudienceState } from './audience.interface';
import { Subject } from 'rxjs';

@Component({
  selector:        'fba-audience',
  templateUrl:     './audience.html',
  styleUrls:       ['./audience.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation:   ViewEncapsulation.None
})
export class AudienceComponent implements OnInit, OnDestroy {
  destroy$  = new Subject();
  audience$ = new Subject();

  @Input() audience: AudienceState;
  @Input() index: number;
  @Input() audienceEditIndex: number | null;
  @Output() updateAudience = new EventEmitter();
  @Output() editAudience   = new EventEmitter();

  setName (name: string) {
    if (!name || name === this.audience.name) {
      return;
    }
    this.audience$.next(
      Object.assign({}, this.audience, {name})
    );
  }

  setActive (active: number) {
    this.audience$.next(
      Object.assign({}, this.audience, {active})
    );
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    // TODO: Decide how to fix this unnecessary code. Do it after replacing md-slider component.
    this.audience$
        .takeUntil(this.destroy$)
        .skip(2) // Because md-slider trigger setActive twice on first init
        .subscribe((audience: AudienceState) => {
          const index   = this.index;
          this.audience = audience;
          this.updateAudience.emit({index, audience});
        });
  }
}
