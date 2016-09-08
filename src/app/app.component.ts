import { Component } from '@angular/core';

@Component({
  selector:    'app-root',
  templateUrl: './app.component.html',
  styleUrls:   ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  spec  = {
    "device_platforms":    [
      "mobile"
    ],
    "publisher_platforms": [
      "facebook",
      "instagram",
      "audience_network"
    ],
    "facebook_positions":  [
      "feed"
    ],
    "user_os":             [
      "iOS"
    ],
    "geo_locations":       {
      "countries": [
        "RU"
      ]
    },
    "age_min":             18,
    "age_max":             65,
    "user_device":         [],
    "interested_in":       [
      2
    ],
    "interests":           [
      {
        "id":   "6002839660079",
        "name": "Cosmetics"
      },
      {
        "id":   "6002866718622",
        "name": "Science"
      }
    ]
  };

  onChange = (spec) => {
    this.spec = spec;
  };
}
