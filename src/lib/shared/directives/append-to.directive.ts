import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

@Directive({
  selector: '[appendTo]'
})
export class AppendToDirective implements OnInit, OnDestroy {

  @Input() appendTo: string = 'body';

  private element: HTMLElement;
  private veil: HTMLElement;

  constructor (private ElementRef: ElementRef) {
    this.element = this.ElementRef.nativeElement;
  }

  ngOnDestroy () {
    this.veil.remove();
  }

  ngOnInit () {
    const targetElement       = <HTMLElement>window.document.querySelector(this.appendTo);
    const appendToElementRect = targetElement.getBoundingClientRect();
    const currentRect         = this.element.getBoundingClientRect();

    this.veil                = window.document.createElement('div');
    this.veil.style.position = 'absolute';
    this.veil.style.top      = '0';
    this.veil.style.bottom   = '0';
    this.veil.style.left     = '0';
    this.veil.style.right    = '0';

    if (targetElement.style.position === 'static') {
      targetElement.style.position = 'relative';
    }

    this.element.style.position = 'absolute';
    this.element.style.zIndex   = '1000';
    this.element.style.top      = `${currentRect.top - appendToElementRect.top}px`;
    this.element.style.left     = `${currentRect.left - appendToElementRect.left}px`;

    targetElement.appendChild(this.veil);
    targetElement.appendChild(this.element);
  }
}
