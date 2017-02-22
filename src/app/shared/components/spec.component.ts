import {
  Component, OnDestroy, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, ViewChild, AfterViewInit
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { escape$ } from '../../../lib/shared/constants/event-streams.constants';

@Component({
  selector: 'fba-spec',
  template: `

<div class="fba-spec"
     [fbaClickOutsideStream]="fbaClickOutsideOfSpec$">
  <textarea #textarea cols="50" autofocus readonly>{{ spec | json}}</textarea>
  <fba-close (onClose)="close.emit($event)"></fba-close>
</div>

`,

  styles:          [`

.fba-spec {
  position:         absolute;
  display:          flex;
  justify-content:  center;
  align-content:    center;
  align-items:      center;
  top:              0;
  bottom:           0;
  left:             0;
  right:            0;
  margin:           0;
  font-size:        14px;
  background-color: rgba(33, 33, 33, 0.48);
  z-index:          1000;
}

fba-close {
  color:     #ffffff;
  font-size: 25px;
}

textarea {
  border-radius: 3px;
  padding: 5px;
  outline: none;
}

`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecComponent implements OnInit, OnDestroy, AfterViewInit {

  destroy$            = new Subject();
  fbaClickOutsideOfSpec$ = new Subject();

  @ViewChild('textarea') textarea;

  @Input() spec   = {};
  @Output() close = new EventEmitter();

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngAfterViewInit () {
    this.textarea.nativeElement.style.height    = this.textarea.nativeElement.scrollHeight + 'px';
    this.textarea.nativeElement.style.maxHeight = '500px';
  }

  ngOnInit () {
    this.textarea.nativeElement.focus();

    escape$
      .takeUntil(this.destroy$)
      .merge(this.fbaClickOutsideOfSpec$)
      .subscribe((e) => {
        this.close.emit(e);
      });
  }
}
