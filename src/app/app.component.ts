import { Component } from '@angular/core';
import { DetailedTargetingComponent } from './detailed-targeting';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [DetailedTargetingComponent]
})
export class AppComponent {
}
