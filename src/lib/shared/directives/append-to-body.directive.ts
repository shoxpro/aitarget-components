import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appendToBody]'
})
export class AppendToBodyDirective implements OnInit, OnDestroy {

  private element;

  constructor (private ElementRef: ElementRef) {
    this.element = this.ElementRef.nativeElement;
  }

  ngOnDestroy () {}

  ngOnInit () {
    const currentRect = this.element.getBoundingClientRect();

    this.element.style.position = 'absolute';
    this.element.style.top      = `${currentRect.top}px`;
    this.element.style.left     = `${currentRect.left}px`;

    window.document.querySelector('body')
          .appendChild(this.element);
  }
}
