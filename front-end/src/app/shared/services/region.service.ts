import { Injectable, Inject, Injector } from '@angular/core';
import {BaseService} from './base.service';
import {IHttpResult} from '../interface/IHttpResult';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RegionService extends BaseService {

  constructor(
    @Inject(Injector) injector: Injector
  ) {
    super('regiao', injector);
  }

  GetAll(): Observable<any> {
    return this.http.get<any>(`${this.urlBase}`);
  }

  Post(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlBase}`, data);
  }

  Put(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlBase}/${data.id}`, data);
  }

}
