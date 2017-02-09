/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GiphyApiService } from './giphy-api.service';

describe('GiphyApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GiphyApiService]
    });
  });

  it('should ...', inject([GiphyApiService], (service: GiphyApiService) => {
    expect(service).toBeTruthy();
  }));
});
