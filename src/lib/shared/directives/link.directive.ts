import { Input, Directive, HostListener } from '@angular/core';
@Directive({
  selector: '[href]'
})
export class LinkDirective {
  @Input() href;

  // noinspection JSUnusedGlobalSymbols
  @HostListener('click', ['$event'])
  preventDefault ($event) {
    if (this.href.length === 0 || this.href === '#') {
      event.preventDefault();
    }
  }
}
