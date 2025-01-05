import { Injectable, Inject, Injector } from '@angular/core';
import {BaseService} from './base.service';
import {IHttpResult} from '../interface/IHttpResult';
import {Observable} from 'rxjs';
import {Region} from "../model/Region";

@Injectable({ providedIn: 'root' })
export class RegionService extends BaseService {

  constructor(
    @Inject(Injector) injector: Injector
  ) {
    super('regiao', injector);
  }

  GetAll(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.urlBase}`);
  }

  GetById(id: number): Observable<Region> {
    return this.http.get<Region>(`${this.urlBase}/${id}`);
  }

  Post(data: any): Observable<void> {
    return this.http.post<void>(`${this.urlBase}`, data);
  }

  Put(data: any): Observable<void> {
    return this.http.put<void>(`${this.urlBase}/${data.id}`, data);
  }

  ChangeStatus(id: number): Observable<void> {
    return this.http.patch<void>(`${this.urlBase}/mudar-status/${id}`, null);
  }

}
