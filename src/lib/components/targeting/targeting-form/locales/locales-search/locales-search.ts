import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector:        'fba-locales-search',
  template:        `<input type="text"
                           placeholder="{{ placeholder }}"
                           #input
                           (keyup)="inputValueChange.emit(input.value)" />`,
  styles:          [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocalesSearchComponent {
  @Output() inputValueChange = new EventEmitter();

  placeholder = 'Enter a language';
}
