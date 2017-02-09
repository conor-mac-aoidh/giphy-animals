import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

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
  pagniation: Pagination;
}

@Injectable()
export class GiphyApiService {

  constructor(private http: Http) { }

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
    }).map(res => res.json());
  }

}
