import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Locale } from '../interfaces/locale.interface';

@Component({
  selector:        'fba-locales-dropdown',
  template:        `<div>
                      <div *ngFor="let locale of locales"
                            (click)="select.emit(locale)">{{ locale.name }}</div>
                    </div>`,
  styles:          [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocalesDropdownComponent {
  @Input() locales: Array<Locale>;
  @Output() select = new EventEmitter();
}
