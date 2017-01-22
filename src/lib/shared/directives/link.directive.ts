import { Input, Directive, HostListener } from '@angular/core';
@Directive({
  /* tslint:disable:directive-selector */
  selector: '[href]'
  /* tslint:enable:directive-selector */
})
export class LinkDirective {
  @Input() href;

  // noinspection JSUnusedGlobalSymbols
  @HostListener('click', ['$event'])
  preventDefault (event) {
    if (this.href.length === 0 || this.href === '#') {
      event.preventDefault();
    }
  }
}
