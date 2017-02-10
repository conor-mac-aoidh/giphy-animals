/* tslint:disable:no-unused-variable */

import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

import { GiphyApiService } from './giphy-api.service';

describe('GiphyApiService', () => {
  let giphy: GiphyApiService;
  let preloadSpy: jasmine.Spy;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        GiphyApiService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  beforeEach(inject([GiphyApiService, XHRBackend], (service: GiphyApiService, mockBackend: MockBackend) => {
    giphy = service;
    backend = mockBackend;
    preloadSpy = spyOn(giphy, 'preloadImage').and.returnValue(Observable.of({}));
  }));

  it('should search for gifs using default parameters', (cb) => {
    const response = new Response(new ResponseOptions({
      status: 200,
      body: {
        data: [<Gif>{
          id: 'test',
          images: {
            fixed_width: {
              url: 'example'
            }
          }
        }]
      }
    }));
    backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
    giphy.search()
      .subscribe(
        () => {
          expect(preloadSpy).toHaveBeenCalledWith('test', 'example');
          cb();
        },
        err => {
          expect(false).toEqual(true);
          cb();
        }
      );
  });

  it('should handle a http error', (cb) => {
    const response = new Response(new ResponseOptions({
      status: 500,
      body: {
        message: 'Timeout'
      }
    }));
    backend.connections.subscribe((c: MockConnection) => c.mockError(response));
    giphy.search()
      .subscribe(
        () => {
          expect(false).toEqual(true);
          cb();
        },
        err => {
          expect(preloadSpy).not.toHaveBeenCalled();
          cb();
        }
      );
  });

});
