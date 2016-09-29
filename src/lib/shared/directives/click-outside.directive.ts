import { Directive, ElementRef, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective implements OnInit, OnDestroy {

  @Output()
  public clickOutside = new EventEmitter();
  private element;

  private onClick = (e) => {
    const targetElement = e.target;
    const clickedInside = this.element
                              .contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit(null);
    }
  };

  constructor (private ElementRef: ElementRef) {
    this.element = this.ElementRef.nativeElement;
  }

  ngOnDestroy () {
    window.document.body.removeEventListener('click', this.onClick);
  }

  ngOnInit () {
    window.document.body.addEventListener('click', this.onClick);
  }

}
