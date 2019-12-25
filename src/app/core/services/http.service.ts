import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { filter } from 'rxjs/operators';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}
  post(url: string, body: any = {}) {
    return this.request(url, 'POST', body);
  }

  get(url: string,params?: any) {
    return this.request(url, 'GET',params);
  }
  put(url: string,params: any) {
    return this.request(url, 'PUT',params);
  }
  delete(url: string,params?: any) {
    console.log(url)
    return this.request(url, 'DELETE', params);
  }

  private request(url: string, method: string, data?: any){
    let reqData:any = null;
    let httpOptions:any = {};
    if(data){
      if(method === 'GET'){
        httpOptions.params = data;
      }
      else if(method === 'POST' || method==='PUT' || method==='DELETE'){
        reqData = data;
      }
    }
    const req = new HttpRequest(method, environment.apiUrl + url,reqData, httpOptions);
    return this.http.request(req)
    .pipe(
      filter((response:any) => response instanceof HttpResponse),
      map((response:any) => {
          return response.body;
      }),
      catchError(error => this.onErrorHandler(error))
    );
  }

  private onErrorHandler(error: any) {
    // const errors = error.json();
    // if(error.status == 406 && Array.isArray(errors) && errors.indexOf("User is not logged in.") !== -1) {
    // } else if (error.status == 401 && Array.isArray(errors) && errors.indexOf("CSRF validation failed") !== -1) {
    //   // TODO: should logout after getting token
    // }
    console.log(error,'fffffffffffffffffff');
    return Observable.throw(error.error);
  }
}
