import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Locale } from '../interfaces/locale.interface';

@Component({
  selector:        'fba-locales-selected',
  template:        `<div>
                      <div class="locales-selected__row" *ngFor="let locale of selectedLocales">
                        <div class="locales-selected__name">{{ locale.name }}</div>
                        <fba-close (onClose)="remove.emit(locale)"></fba-close>
                      </div>
                    </div>`,
  styles:          [`
                      .locales-selected__row {
                        display: flex;
                        position: relative;
                      }
                      .locales-selected__name {
                        flex-grow: 2;
                      }
                    `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocalesSelectedComponent {
  @Input() selectedLocales: Array<Locale>;
  @Output() remove = new EventEmitter();
}
