import { Component } from '@angular/core';
import { campaignDefault } from './crud.constants';
import { CrudApiService } from './crud-api.service';

@Component({
  selector: 'fba-crud',
  template: `
              <div>
                <form #f="ngForm"
                      (ngSubmit)="save(f.value, f.valid)"
                      novalidate>
                  <fieldset>
                    <legend>Create Campaign</legend>
                    <textarea name="campaign"
                              [(ngModel)]="campaign"
                              cols="100"
                              rows="7">
                      </textarea>
                  </fieldset>

                  <button>Submit</button>
                  <div>
                    <div *ngIf="campaignResponse">
                      <p>Result:</p>
                      <div>{{campaignResponse | json}}</div>
                    </div>
                    <div *ngIf="campaignError">
                      <p>Error:</p>
                      <div>{{campaignError | json}}</div>
                    </div>
                  </div>
                </form>
              </div>
            `,
  styles:   [`
    :host {
      font-size: 1.4rem;
    }

    textarea {
      display: block;
    }
  `]
})
export class CrudComponent {
  campaign = JSON.stringify(campaignDefault, null, 2);
  campaignResponse;
  campaignError;

  save (value, valid) {
    console.log(`value, valid: `, value, valid);
    this.crudApiService.createCampaign(JSON.parse(value.campaign))
        .subscribe((response) => {
          this.campaignResponse = response;
        }, (error) => {
          this.campaignError = error;
          console.log(`Error crating campaign: `, error);
        });
  }

  constructor (private crudApiService: CrudApiService) {}
}
