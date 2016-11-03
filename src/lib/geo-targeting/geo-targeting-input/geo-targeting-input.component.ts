import {
  Component, OnInit, ChangeDetectionStrategy, OnDestroy, Input, Output, EventEmitter, ElementRef, OnChanges
} from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Component({
  selector:        'geo-targeting-input',
  templateUrl:     './geo-targeting-input.component.html',
  styleUrls:       ['./geo-targeting-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingInputComponent implements OnInit, OnDestroy, OnChanges {

  destroy$    = new Subject();
  inputValue$ = new Subject();
  inputElement;

  @Input() inputValue;
  @Input() hasFocus;
  @Input() debounceTime = 1000;

  @Output() focus            = new EventEmitter();
  @Output() blur             = new EventEmitter();
  @Output() enter             = new EventEmitter();
  @Output() inputValueChange = new EventEmitter();

  keyup (inputValue) {
    this.inputValue$.next(inputValue);
  }

  checkFocus () {
    if (!this.inputElement) {
      return;
    }

    if (this.hasFocus) {
      this.inputElement.focus();
    } else {
      this.inputElement.blur();
    }
  }

  constructor (private elementRef: ElementRef) {}

  ngOnChanges (changes) {
    if (changes.hasFocus.currentValue !== changes.hasFocus.previousValue) {
      this.checkFocus();
    }
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.inputElement = this.elementRef.nativeElement.querySelector('input');

    this.checkFocus();

    this.inputValue$
        .takeUntil(this.destroy$)
        .debounceTime(this.debounceTime)
        .distinctUntilChanged()
        .subscribe((inputValue) => this.inputValueChange.emit(inputValue));
  }

}
