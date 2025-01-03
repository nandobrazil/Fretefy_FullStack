import {StorageKeyUtil} from './storage-key.util';
import {Auth} from '../model/auth';
import {Router} from '@angular/router';

export class AuthUtil {

  static store(auth: Auth): void {
    localStorage.setItem(StorageKeyUtil.ACCESS_TOKEN, auth.accessToken);
  }

  static remove(): void {
    localStorage.removeItem(StorageKeyUtil.ACCESS_TOKEN);
  }

  static get(): Auth {
    const accessToken: string = localStorage.getItem(StorageKeyUtil.ACCESS_TOKEN);

    const auth: Auth = new Auth();
    auth.accessToken = accessToken;

    return auth;
  }

  static isAuth(): boolean {
    const accessToken: string = localStorage.getItem(StorageKeyUtil.ACCESS_TOKEN);

    return accessToken !== null
      && accessToken !== undefined
      && accessToken !== '';
  }

  static logOut(router: Router): void {
    AuthUtil.remove();
    router.navigate(['/auth/login']).then();
  }

}
