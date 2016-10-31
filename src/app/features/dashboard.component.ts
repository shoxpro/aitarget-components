import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector:    'my-dashboard',
  templateUrl: './dashboard.component.html',
  styles:      [`#my-logout-button { background: #f44336 }`]
})

export class DashboardComponent implements OnDestroy, OnInit {
  constructor () {
  }

  ngOnInit () {}

  ngOnDestroy () {}
}
