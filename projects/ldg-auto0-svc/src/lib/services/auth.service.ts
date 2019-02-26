import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, config, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {auth0} from 'auth0-js';
import {ConfigurationModel} from '../models/ConfigurationModel';
import {CallbackComponent} from '../components/callback/callback.component';

@Injectable()
export class AuthService {

  private _idToken: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private _accessToken: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private _expiresAt: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  private _isExpired: BehaviorSubject<boolean> =
    new BehaviorSubject(true);
  private _userProfile: BehaviorSubject<any> =
    new BehaviorSubject<any>({});

  private _timer;

  private auth0 = new auth0.WebAuth(this.configuration.Config);

  public get IdToken(): Observable<string> {
    return this._idToken.asObservable();
  }

  public get AccessToken(): Observable<string> {
    return this._accessToken.asObservable();
  }

  public get UserProfile(): Observable<any> {
    return this._userProfile.asObservable();
  }

  public get IsExpired(): Observable<boolean> {
    return this._isExpired.asObservable();
  }

  private set ExpiresAt(val: number) {
    this._expiresAt.next(val);
    this.runTimer();
  }

  private setAccessToken(val: string) {
    this._accessToken.next(val);
  }

  private setIdToken(val: string) {
    this._idToken.next(val);
  }

  constructor(@Inject(ConfigurationModel)private configuration: ConfigurationModel,
              public router: Router) {
    router.config.push(
      {path: configuration.Settings.callbackRouteName, component: CallbackComponent}
    );
  }

  private runTimer() {
    this._timer = setInterval(() => {
      this._isExpired.next(new Date().getTime() > this._expiresAt.value);
      if (this._isExpired.value) {
        clearInterval(this._timer);
      }
    }, 500);
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.localLogin(authResult);
        this.router.navigate([this.configuration.Settings.postCallbackRouteName]);
      } else if (err) {
        this.router.navigate([this.configuration.Settings.postCallbackRouteName]);
        console.log(err);
      }
    });
  }

  private localLogin(authResult): void {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    // Set the time that the access token will expire at
    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this._accessToken.next(authResult.accessToken);
    this.loadProfile(authResult.accessToken);
    this._idToken.next(authResult.idToken);
    this.ExpiresAt = expiresAt;
  }

  public renewTokens(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        alert(
          `Could not get a new token (${err.error}: ${err.errorDescription}).`
        );
        this.logout();
      }
    });
  }

  public logout(): void {
    // Remove tokens and expiry time
    this.setAccessToken('');
    this.setIdToken('');
    this.ExpiresAt = 0;
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    alert('Logged Out!');
    // Go back to the home route
    this.router.navigate([this.configuration.Settings.postLogoutRouteName]);
  }


  private loadProfile(accessToken: string): void {
    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self._userProfile.next(profile);
      }
    });
  }
}
