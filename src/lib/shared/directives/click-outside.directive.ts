import { Directive, ElementRef, Output, EventEmitter, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { bodyClick$ } from '../constants/event-streams.constants';

/* tslint:disable:directive-selector-name */
@Directive({
  selector: '[clickOutside],[clickOutsideStream]'
})
/* tslint:enable:directive-selector-name */
export class ClickOutsideDirective implements OnInit, OnDestroy {

  destroy$ = new Subject();

  @Input() clickOutsideStream = new Subject();
  @Output() clickOutside      = new EventEmitter();

  constructor (private elementRef: ElementRef) {}

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    bodyClick$
      .takeUntil(this.destroy$)
      .subscribe((e: MouseEvent) => {
        const targetElement = e.target;
        const clickedInside = this.elementRef.nativeElement
                                  .contains(targetElement);
        if (!clickedInside) {
          this.clickOutsideStream.next(e);
          this.clickOutside.emit(e);
        }
      });
  }

}
