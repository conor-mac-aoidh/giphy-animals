import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';

import { Gif } from '../models/gif';

const publicKey = 'dc6zaTOxFJmzC';
const endpoint = 'http://api.giphy.com/v1/gifs/';

interface ResponseStatus {
  status: number;
  msg: string;
}

interface Pagination {
  count: number;
  offset: number;
  total_count: number;
}

export interface Response<T> {
  data: Array<T>;
  meta: ResponseStatus;
  pagination: Pagination;
}

@Injectable()
export class GiphyApiService {

  constructor(private http: Http) { }

  preloadImage(url) {
    return new Observable(obs => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        obs.next()
      };
      img.onerror = obs.error;
    });
  }

  /**
   * search
   *
   * Query the API for GifModels that match the search
   * term.
   *
   * @param {string} query
   * @return {Observable<GifModel>}
   */
  search(query = 'pupies', offset = 0, limit = 15): Observable<Response<Gif>> {
    const params = new URLSearchParams();
    params.set('q', query);
    params.set('offset', offset.toString());
    params.set('limit', limit.toString());
    params.set('api_key', publicKey);
    return this.http.get(endpoint + 'search', {
      search: params
    })
      .map(res => res.json())
      .mergeMap((res: Response<Gif>) => {
        const tasks = [];

        // lazy load gifs
        res.data.forEach((gif: Gif) => {
          console.log(gif.images.fixed_width.url);
          console.log(gif.images.downsized.url);
          tasks.push(this.preloadImage(gif.images.fixed_width.url));
          tasks.push(this.preloadImage(gif.images.downsized.url));
        });

        return Observable.forkJoin(tasks);
      }, (res: Response<Gif>) => res);
  }

}
