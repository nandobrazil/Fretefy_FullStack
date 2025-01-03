import {Inject, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

export abstract class BaseService {

  urlBase = '';
  http: HttpClient;

  protected constructor(
    public url: string,
    @Inject(Injector) injector: Injector
  ) {
    this.urlBase = `${environment.apiUrl}/${this.url}`;
    this.http = injector.get(HttpClient);
  }

}
