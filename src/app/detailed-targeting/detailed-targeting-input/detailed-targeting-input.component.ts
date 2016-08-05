import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DetailedTargetingApiService } from '../detailed-targeting-api/detailed-targeting-api.service';
import { DetailedTargetingModeComponent } from '../detailed-targeting-mode/';
import { DetailedTargetingModeService } from '../detailed-targeting-mode/detailed-targeting-mode.service';

@Component({
  moduleId: module.id,
  selector: 'detailed-targeting-input',
  templateUrl: 'detailed-targeting-input.component.html',
  styleUrls: ['detailed-targeting-input.component.css'],
  directives: [DetailedTargetingModeComponent]
})
export class DetailedTargetingInputComponent implements OnInit {

  private _searchTermStream = new Subject<string>();
  private term: string;

  /**
   * Search on typing
   * @param term
   */
  public search (term: string) {
    this._searchTermStream.next(term);
  }

  /**
   * Open dropdown with suggestions when gets focus
   */
  public focus () {
    this.DetailedTargetingModeService.set('suggested');
  }

  constructor (private DetailedTargetingApiService: DetailedTargetingApiService,
               private DetailedTargetingModeService: DetailedTargetingModeService) {}

  ngOnInit () {
    this._searchTermStream
        .debounceTime(500)
        .distinctUntilChanged()
        .subscribe((term: string) => {
          this.DetailedTargetingApiService.search(term);
        });
  }

}
