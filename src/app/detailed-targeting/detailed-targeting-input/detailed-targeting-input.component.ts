import { Component, OnInit } from '@angular/core';
import { Subject }          from 'rxjs/Subject';
import { DetailedTargetingApiService } from '../detailed-targeting-api/detailed-targeting-api.service';

@Component({
  moduleId: module.id,
  selector: 'detailed-targeting-input',
  templateUrl: 'detailed-targeting-input.component.html',
  styleUrls: ['detailed-targeting-input.component.css'],
  providers: [DetailedTargetingApiService]
})
export class DetailedTargetingInputComponent implements OnInit {

  private _searchTermStream = new Subject<string>();
  private term: string;

  search (term: string) {
    this._searchTermStream.next(term);
  }

  constructor (private DetailedTargetingApiService: DetailedTargetingApiService) {
    this.term = 'fish';
    this.DetailedTargetingApiService.search(this.term);
  }

  ngOnInit () {
    this._searchTermStream
        .debounceTime(500)
        .distinctUntilChanged()
        .subscribe((term: string) => {
          this.DetailedTargetingApiService.search(term);
        });
  }

}
