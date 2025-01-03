import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthUtil} from '../util/auth.util';

@Injectable({providedIn: 'root'})
export class AuthGuard {

  constructor(
    public router: Router
  ) {
  }

  canActivate(): boolean {
    //todo: implementar verificação de permissão
    return true;
    const authenticated = AuthUtil.isAuth();
    if (!authenticated) {
      AuthUtil.logOut(this.router);
    }
    return authenticated;
  }
}
