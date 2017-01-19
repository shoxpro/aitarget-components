import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector:        'fba-info-icon',
  template:        `<div class="fba-info-icon">
                      <svg xmlns="http://www.w3.org/2000/svg"
                           fill="#000000"
                           height="24"
                           viewBox="0 0 24 24"
                           width="24">
                        <path d="M0 0h24v24H0z"
                              fill="none" />
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 
                        12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                      </svg>
                      <div class="fba-info-icon__popup">
                        <ng-content></ng-content>
                      </div>
                    </div>`,
  styles:          [`
                    :host {
                      position: relative;
                      display: inline-block;
                      width: 13px;
                      height: 13px;
                      vertical-align: middle;
                    }
                    
                    .fba-info-icon {
                      cursor: pointer;
                    }
                    
                    .fba-info-icon svg {
                      fill: #bec2c9;
                      width: 100%;
                      height: 100%;
                    }
                    
                    .fba-info-icon:hover svg {
                      fill: #7f7f7f;
                    }
                    
                    .fba-info-icon__popup {
                      position: absolute;
                      display: none;
                      border: 1px solid #dddddd;
                      width: auto;
                      height: auto;
                      min-width: 250px;
                      bottom: 25px;
                      left: -14px;
                      padding: 5px 5px 0;
                      border-radius: 3px;
                      background-color: #ffffff;
                      box-shadow: -1px 2px 13px -3px rgba(0,0,0,0.75);
                    }
                    
                    .fba-info-icon__popup:after {
                      position: absolute;
                      bottom: 0;
                      transform: translateY(100%);
                      left: 11px;
                      display: inline-block;
                      border-left: 8px solid transparent;
                      border-top: 8px solid #ffffff;
                      border-right: 8px solid transparent;
                      content: "";
                    }
                    
                    .fba-info-icon__popup:before {
                      position: absolute;
                      bottom: 0;
                      transform: translateY(100%);
                      left: 10px;
                      display: inline-block;
                      border-left: 9px solid transparent;
                      border-top: 9px solid #dddddd;
                      border-right: 9px solid transparent;
                      content: "";
                    }
                    
                    .fba-info-icon:hover .fba-info-icon__popup {
                      display: inline-block;
                    }
`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoIconComponent {
}
