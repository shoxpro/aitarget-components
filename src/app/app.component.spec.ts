/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LibModule } from '../lib/lib.module';

describe('App: AitargetComponents', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:      [
        LibModule
      ],
      declarations: [
        AppComponent
      ],
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app.title)
      .toEqual('app works!');
  }));

  it('should have toggle button', async(() => {
    let fixture  = TestBed.createComponent(AppComponent);
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent)
      .toContain('Toggle');
  }));
});
