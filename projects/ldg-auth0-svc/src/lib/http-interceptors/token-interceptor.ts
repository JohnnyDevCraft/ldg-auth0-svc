import {Injectable, OnDestroy} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import {Observable, Subscription} from 'rxjs';
import {SettingsModel} from '../models/settings.model';




@Injectable()
export class TokenInterceptor implements HttpInterceptor, OnDestroy {
  authToken: string;
  settings: SettingsModel;

  private subscriptions: Subscription[] = [];

  constructor(public auth: AuthService) {
    this.authToken = '';

    const self = this;

    this.subscriptions.push(this.auth.AccessToken.subscribe(x => {
      self.authToken = x;
    }));

    this.subscriptions.push(this.auth.Settings.subscribe(x => this.settings = x));


  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.debug(`Attaching Auth Header to request with: \nBearer ${this.authToken}`);
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authToken}`
      }
    });

    return next.handle(request);
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
