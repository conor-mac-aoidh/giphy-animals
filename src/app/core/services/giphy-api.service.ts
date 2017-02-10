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

  /**
   * preloadImage
   *
   * Preloads an image.
   *
   * @param {string} url
   * @return {Observable<Object>}
   */
  preloadImage(url): Observable<void> {
    return new Observable(obs => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        obs.next();
        obs.complete();
      };
      img.onerror = (err) => {
        obs.error(err);
      };
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
          tasks.push(this.preloadImage(gif.images.fixed_width.url));
        });

        return Observable.forkJoin(tasks);
      }, (res: Response<Gif>) => res);
  }

}
