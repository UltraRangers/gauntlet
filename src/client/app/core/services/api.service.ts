import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { each } from 'lodash';

// Import RxJs required methods
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  private apiBaseURL: string = '/api';
  private accessToken: string = null;
  private ACCESS_TOKEN_KEY: string = 'accessToken';

  public constructor(
    private http: Http
  ) {
    this.accessToken = localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  public setAccessToken(token: string) {
    if (token) {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    }
    this.accessToken = token;
  }

  public get(path: string, data?: object): Observable<any> {
    const params = new URLSearchParams();
    each(data || {}, (value: any, key: any) => {
      params.set(key, value);
    });

    const headers = new Headers(this.getHeaders());
    const options = new RequestOptions({ search: params, headers });

    return this.http.get(this.apiBaseURL + path, options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public post(path: string, data: object): Observable<any> {
    const bodyString = JSON.stringify(data);
    const headers = new Headers(this.getHeaders());
    const options = new RequestOptions({ headers });

    return this.http.post(this.apiBaseURL + path, bodyString, options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public put(path: string, data: object): Observable<any> {
    const bodyString = JSON.stringify(data);
    const headers = new Headers(this.getHeaders());
    const options = new RequestOptions({ headers });

    return this.http.put(this.apiBaseURL + path, bodyString, options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public delete(path: string): Observable<any> {
    const headers = new Headers(this.getHeaders());
    const options = new RequestOptions({ headers });

    return this.http.delete(this.apiBaseURL + path, options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  private getHeaders() {
    const headers: any = {
      'Content-Type': 'application/json'
    };

    if (this.accessToken) {
      headers['x-access-token'] = this.accessToken;
    }

    return headers;
  }

}
