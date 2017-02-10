/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { CoreModule } from '../core.module';
import { GiphyApiService } from '../services/giphy-api.service';
import { BodyComponent } from './body.component';

describe('BodyComponent', () => {
  let searchSpy: jasmine.Spy;
  let component: BodyComponent;
  let fixture: ComponentFixture<BodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CoreModule ]
    })
    .compileComponents();
  }));

  beforeEach(inject([GiphyApiService], (giphyApi: GiphyApiService) => {
    searchSpy = spyOn(giphyApi, 'search').and.returnValue(Observable.of({
      data: [],
      pagination: {
        total_count: 0
      }
    }));
    fixture = TestBed.createComponent(BodyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start in the loading state', () => {
    expect(component.loading).toEqual(true);
  });

  it('should run a search on init', () => {
    fixture.detectChanges();
    expect(searchSpy).toHaveBeenCalledWith('kittens', 0);
  });

  it('should stop loading when search is completed', () => {
    fixture.detectChanges();
    expect(component.loading).toEqual(false);
  });

  it('should destroy the observable on destroy', () => {
    fixture.detectChanges();
    const destroySpy = spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalledWith();
  });

  it('should update the page count when search is completed', () => {
    fixture.detectChanges();
  });

  it('should show an error message when the search fails', () => {
    searchSpy.and.returnValue(Observable.throw());
    expect(component.errorMsg).toEqual('');
    fixture.detectChanges();
    expect(component.errorMsg).toEqual('Failed to fetch data..');
  });

});
