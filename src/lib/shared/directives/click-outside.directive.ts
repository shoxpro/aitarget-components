import { Directive, ElementRef, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective implements OnInit, OnDestroy {

  @Output()
  clickOutside = new EventEmitter();
  element;

  onClick = (e) => {
    const targetElement = e.target;
    const clickedInside = this.element
                              .contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit(null);
    }
  };

  constructor (private elementRef: ElementRef) {
    this.element = this.elementRef.nativeElement;
  }

  ngOnDestroy () {
    window.document.body.removeEventListener('click', this.onClick);
  }

  ngOnInit () {
    window.document.body.addEventListener('click', this.onClick);
  }

}
