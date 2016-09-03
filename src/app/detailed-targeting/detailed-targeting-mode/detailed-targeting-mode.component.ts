import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { DetailedTargetingModeService } from './detailed-targeting-mode.service';
import { DetailedTargetingInfoService } from '../detailed-targeting-info/detailed-targeting-info.service';

@Component({
  selector: 'detailed-targeting-mode',
  templateUrl: 'detailed-targeting-mode.component.html',
  styleUrls: ['detailed-targeting-mode.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedTargetingModeComponent implements OnInit {

  private mode;

  public setMode = (mode: string) => {
    this.DetailedTargetingModeService.set(mode);
  };

  constructor (private DetailedTargetingModeService: DetailedTargetingModeService,
               private DetailedTargetingInfoService: DetailedTargetingInfoService,
               private ref: ChangeDetectorRef) {
  }

  /**
   * Set mode to null if user click outside detailed-targeting element
   * @param e
   */
  public processOutsideClick = (e) => {
    let clickedOutside = true;
    let elm = e.target;

    while (elm && clickedOutside) {
      clickedOutside = elm.tagName.toLowerCase() !== 'detailed-targeting';
      elm = elm.parentElement;
    }

    if (clickedOutside) {
      this.DetailedTargetingModeService.set(null);
      this.DetailedTargetingInfoService.update(null);
    }
  };

  ngOnInit () {
    this.DetailedTargetingModeService.mode.subscribe((mode: string) => {
      this.mode = mode;

      // Process body clicks in order to close element if clicked outside and element
      window.document.body.removeEventListener('click', this.processOutsideClick);
      if (mode) {
        window.document.body.addEventListener('click', this.processOutsideClick);
      }

      this.ref.markForCheck();
      this.ref.detectChanges();
    });
  }

}
