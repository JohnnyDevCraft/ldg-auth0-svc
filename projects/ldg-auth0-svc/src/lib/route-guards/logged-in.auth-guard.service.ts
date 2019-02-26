import {Injectable, OnDestroy} from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {SettingsModel} from '../models/settings.model';
import {Subscription} from 'rxjs';


@Injectable()
export class LoggedInAuthGuardService implements CanActivate, OnDestroy {

  settings: SettingsModel;
  subscriptions: Subscription[] = [];

  constructor(public auth: AuthService, public router: Router) {
    this.subscriptions.push(auth.Settings.subscribe(val => this.settings = val));
  }

  canActivate(): boolean {
    if (!this.auth.IdToken) {
      this.debug(`Authentication Failed: Redirecting user to ${this.settings.unauthorizedRouteName}`);
      this.router.navigate([this.settings.unauthorizedRouteName]);
      return false;
    }
    this.debug('Authentication successful.  Routing Allowed.');
    return true;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  private debug(message: string) {
    if (this.settings.isDebugMode) {
      console.log(message);
    }
  }
}
