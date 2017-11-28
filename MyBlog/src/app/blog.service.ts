import { Injectable } from '@angular/core';
// import {Http, Headers} from '@angular/http';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import {IBlog} from './blogs/blogs';

@Injectable()
export class BlogService {
  private _blogUrl = 'http://localhost:3000/blogs/';

  constructor(private _http: HttpClient) { }

  getBlogs(): Observable<IBlog[]> {
    return this._http.get<IBlog[]>(this._blogUrl)
      //.do(data => console.log('GET: ' +  JSON.stringify(data)))
      .catch(this.handleError);
  }

  createBlog(data: IBlog): Observable<IBlog> {
    return this._http.post<IBlog>(this._blogUrl, data)
      //.do(res => console.log('POST: ' +  JSON.stringify(res)))
      .catch(this.handleError);
  }

  updateBlog(data: IBlog): Observable<IBlog> {
    return this._http.patch<IBlog>(`${this._blogUrl}${data.id}`, data)
      //.do(res => console.log('PATCH: ' +  JSON.stringify(res)))
      .catch(this.handleError);
  }

  deleteBlog(id: number): Observable<IBlog> {
    return this._http.delete<IBlog>(`${this._blogUrl}${id}`)
      //.do(res => console.log('DELETE: ' +  JSON.stringify(res)))
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
