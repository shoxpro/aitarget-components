import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SqueezedValueAccessor } from '../../shared/interfaces/squeeze-value-accessor.inteface';
import { FormControlToken } from '../../shared/constants/form-control-token';
import { BehaviorSubject, Subject } from 'rxjs';
import { Filter } from './filtering.interface';

@Component({
  selector:  'fba-filter',
  providers: [
    {provide: FormControlToken, useExisting: FilterComponent},
  ],
  template:  `
               <fba-filter-field class="filter-item"
                                 [filterStream]="filter$"></fba-filter-field>
               <fba-filter-operator class="filter-item"></fba-filter-operator>
               <fba-filter-value class="filter-item"></fba-filter-value>
               <div role="button"
                    class="apply filter-item">Apply
               </div>
               <fba-close class="remove"
                          (onClose)="remove()"></fba-close>
             `,
  styles:    [`
    :host {
      display:             inline-flex;
      align-items:         center;
      height:              30px;
      background:          #e9ebee;
      border:              solid 1px #dddfe2;
      border-radius:       4px;
      box-shadow:          0 0 1px rgba(0, 0, 0, .6);
      margin:              4px;
      max-width:           100%;
      padding:             2px 4px;
      -webkit-user-select: none;
      vertical-align:      middle;
      box-sizing:          border-box;
      white-space:         nowrap;
    }

    .filter-item {
      display:      inline-flex;
      align-items:  center;
      border:       1px solid #cccccc;
      margin-right: 4px;
      padding:      0 4px;
      height:       20px;
      font-size:    1.1rem;
      cursor:       pointer;
    }

    .apply {
      background-color: #f6f7f9;
      border-color:     #ced0d4;
      color:            #4b4f56;
      margin-left:      2px;
      cursor:           pointer;
    }

    .apply:hover {
      background-color: transparent;
    }

    .remove {
      position: relative;
      top:      0;
      right:    0;
    }
  `]
})
export class FilterComponent implements SqueezedValueAccessor, OnDestroy, OnInit {
  destroy$       = new Subject();
  squeezedValue$ = new BehaviorSubject('–');
  filter$        = new BehaviorSubject({});

  @Input() filter: Filter;
  @Output() onRemove = new EventEmitter();
  @Output() onChange = new EventEmitter();

  // ==== implement SqueezedValueAccessor ====

  updateSqueezedValue () {
    this.filter$
        .take(1)
        .map((filters: Array<Filter>) => {
          return filters.reduce((acc, filter) => {
            acc += `<span style="display: inline-flex">
                        <span>${filter.field}</span>
                      </span>`;

            return acc;
          }, '');
        })
        .subscribe((value) => {
          this.squeezedValue$.next(value || '–');
        });
  }

  getSqueezedValue () {
    return this.squeezedValue$.getValue();
  }

  focus () {
    console.log('focus filter');
  }

  // ==== implement SqueezedValueAccessor ====

  remove () {
    this.onRemove.emit();
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    console.log(`this.filter: `, this.filter);
    this.filter$.next(this.filter);

    this.filter$
        .skip(1)
        .takeUntil(this.destroy$)
        .subscribe((filter: Filter) => {
          this.onChange.emit(filter);
        });
  }
}
