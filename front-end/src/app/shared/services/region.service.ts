import { Injectable, Inject, Injector } from '@angular/core';
import {BaseService} from './base.service';
import {IHttpResult} from '../interface/IHttpResult';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RegionService extends BaseService {

  constructor(
    @Inject(Injector) injector: Injector
  ) {
    super('region', injector);
  }

  GetAll(): Observable<IHttpResult<any>> {
    return this.http.get<IHttpResult<any>>(`${this.urlBase}`);
  }

}
