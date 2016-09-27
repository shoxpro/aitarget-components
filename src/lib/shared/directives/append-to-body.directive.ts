import { Directive, ElementRef, Output, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appendToBody]'
})
export class AppendToBodyDirective implements OnInit, OnDestroy {

  @Output()
  private element;

  constructor (private ElementRef: ElementRef) {
    this.element = this.ElementRef.nativeElement;
  }

  ngOnDestroy () {}

  ngOnInit () {
    const previousSiblingRect = this.element.previousElementSibling.getBoundingClientRect();

    this.element.style.position = 'absolute';
    this.element.style.top      = `${previousSiblingRect.bottom}px`;
    this.element.style.left     = `${previousSiblingRect.left}px`;

    window.document.querySelector('body')
          .appendChild(this.element);
  }
}
