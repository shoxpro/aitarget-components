import { Component } from '@angular/core';
import { adsetDefault, campaignDefault } from './crud.constants';
import { CrudApiService } from './crud-api.service';

@Component({
  selector: 'fba-crud',
  template: `
              <div class="content">
                <form #f="ngForm"
                      (ngSubmit)="save(f.value, f.valid)"
                      novalidate>

                  <fieldset>
                    <legend>CRUD</legend>

                    <fieldset ngModelGroup="campaign">
                      <legend>Campaign</legend>

                      <label *ngFor="let key of campaignKeys">
                        {{key | capitalize}}
                        <input
                          [name]="key"
                          [(ngModel)]="campaign[key]">
                      </label>
                    </fieldset>

                    <fieldset ngModelGroup="adset">
                      <legend>Adset</legend>

                      <label *ngFor="let key of adsetKeys">
                        {{key | capitalize}}
                        <input
                          [name]="key"
                          [(ngModel)]="adset[key]">
                      </label>
                    </fieldset>

                  </fieldset>

                  <button>Submit</button>
                </form>

                <div class="responses">
                  <p *ngFor="let response of responses">{{response | json}}</p>
                </div>
              </div>
            `,
  styles:   [`
    :host {
      display:   block;
      font-size: 1.4rem;
    }

    .content {
      display: flex;
    }

    form {
      flex-grow: 1;
      max-width: 50%;
    }

    label, fieldset {
      margin-bottom: 10px;
      display:       block;
    }

    label:last-child, fieldset:last-child {
      margin: 0;
    }

    input {
      display: inline-block;
      width:   100%;
    }

    button {
      margin: 0 auto;
    }
  `]
})
export class CrudComponent {
  campaign     = campaignDefault;
  campaignKeys = Object.keys(this.campaign);
  adset        = adsetDefault;
  adsetKeys    = Object.keys(this.adset);
  responses    = [];

  save (crud, isValid) {
    console.log(`crud, isValid: `, crud, isValid);
    this.crudApiService.create('campaigns', crud.campaign)
        .do((response) => {
          this.responses.push(response);
        })
        .switchMap(({id}) => {
          return this.crudApiService.create('adsets', Object.assign({}, crud.adset, {campaign_id: id}));
        })
        .subscribe((response) => {
          this.responses.push(response);
        }, (error) => {
          this.responses.push(error);
        });
  }

  constructor (private crudApiService: CrudApiService) {}
}
