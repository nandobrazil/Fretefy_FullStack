import { Injectable, Inject, Injector } from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {City} from '../model/City';

@Injectable({ providedIn: 'root' })
export class CityService extends BaseService {

  constructor(
    @Inject(Injector) injector: Injector
  ) {
    super('cidade', injector);
  }

  GetAll(): Observable<City[]> {
    return this.http.get<City[]>(`${this.urlBase}`);
  }

}
