/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { LibModule } from '../lib/lib.module';
import { NavbarComponent } from './navbar/navbar.component';
import { DemoComponent } from './demo/demo.component';
import { DemoDetailedTargetingComponent } from './demo-detailed-targeting/demo-detailed-targeting.component';
import { DemoGeoTargetingComponent } from './demo-geo-targeting/demo-geo-targeting.component';

describe('App: AitargetComponents', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:      [
        LibModule
      ],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        AppComponent,
        NavbarComponent,
        DemoComponent,
        DemoDetailedTargetingComponent,
        DemoGeoTargetingComponent
      ],
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  }));

  it(`should have as title 'Aitarget Components'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app.title)
      .toEqual('Aitarget Components');
  }));

  it('should have navbar', async(() => {
    let fixture  = TestBed.createComponent(AppComponent);
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-navbar').tagName)
      .toContain('APP-NAVBAR');
  }));

  it('should have router-outlet', async(() => {
    let fixture  = TestBed.createComponent(AppComponent);
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.app__content router-outlet').tagName)
      .toContain('ROUTER-OUTLET');
  }));
});
