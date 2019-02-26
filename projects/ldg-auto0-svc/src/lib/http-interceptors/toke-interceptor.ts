import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';




@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  authToken: string;

  constructor(public auth: AuthService) {
    this.authToken = '';

    const self = this;

    this.auth.AccessToken.subscribe(x => {
      self.authToken = x;
    });

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authToken}`
      }
    });
    return next.handle(request);
  }
}
