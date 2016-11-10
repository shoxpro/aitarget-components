import { Directive, ElementRef, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective implements OnInit, OnDestroy {

  destroy$ = new Subject();

  @Output()
  clickOutside = new EventEmitter();

  constructor (private elementRef: ElementRef) {}

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    Observable.fromEvent(window.document.body, 'click')
              .takeUntil(this.destroy$)
              .skip(1)
              .subscribe((e: MouseEvent) => {
                const targetElement = e.target;
                const clickedInside = this.elementRef.nativeElement
                                          .contains(targetElement);
                if (!clickedInside) {
                  this.clickOutside.emit(null);
                }
              });
  }

}
