/* tslint:disable:no-unused-variable */

import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Response, ResponseOptions, ConnectionBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

import { GiphyApiService } from './giphy-api.service';

describe('GiphyApiService', () => {
  let giphy: GiphyApiService;
  let preloadSpy: jasmine.Spy;
  let lastConnection: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        GiphyApiService,
        { provide: ConnectionBackend, useClass: MockBackend }
      ]
    });
  });

  beforeEach(inject([GiphyApiService, ConnectionBackend], (service: GiphyApiService, mockBackend: MockBackend) => {
    giphy = service;
    mockBackend.connections.subscribe(c => lastConnection = c));
    //preloadSpy = spyOn(giphy, 'preloadImage').and.returnValue(Observable.of());
  }));

  it('should search for gifmodels using default parameters', fakeAsync(() => {
    let mockResponse = new Response(new ResponseOptions({
      data: [{
        images: {
          fixed_width: {
            url: 'example'
          }
        }
      }]
    }));
    console.log(giphy);
    giphy.search();
    lastConnection.mockRespond(mockResponse);
    tick();
    console.log(lastConnection);
    //expect(preloadSpy).toHaveBeenCalledWith('example');
  }));

  it('should handle a http error', () => {

  });

});
