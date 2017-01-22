import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

@Directive({
  selector: '[fbaAppendTo]'
})
export class AppendToDirective implements OnInit, OnDestroy {

  @Input() fbaAppendTo: string;
  @Input() showVeil: boolean = false;

  element: HTMLElement;
  veil: HTMLElement;

  constructor (private elementRef: ElementRef) {
    this.element = this.elementRef.nativeElement;
  }

  ngOnDestroy () {
    if (this.veil) {
      this.veil.remove();
    }
    setTimeout(() => this.element.remove());
  }

  ngOnInit () {
    if (!this.fbaAppendTo) {
      return;
    }

    const targetElement       = <HTMLElement>window.document.querySelector(this.fbaAppendTo);
    const fbaAppendToElementRect = targetElement.getBoundingClientRect();
    const currentRect         = this.element.getBoundingClientRect();

    if (targetElement.style.position === 'static') {
      targetElement.style.position = 'relative';
    }

    if (this.showVeil) {
      this.veil                = window.document.createElement('div');
      this.veil.style.position = 'absolute';
      this.veil.style.top      = '0';
      this.veil.style.bottom   = '0';
      this.veil.style.left     = '0';
      this.veil.style.right    = '0';
      targetElement.appendChild(this.veil);
    }

    this.element.style.position = 'absolute';
    this.element.style.zIndex   = '1000';
    this.element.style.top      = `${currentRect.top - fbaAppendToElementRect.top}px`;
    this.element.style.left     = `${currentRect.left - fbaAppendToElementRect.left}px`;

    targetElement.appendChild(this.element);
  }
}
