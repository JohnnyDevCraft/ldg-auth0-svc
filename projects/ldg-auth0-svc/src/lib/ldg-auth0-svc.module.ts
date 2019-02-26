import {ModuleWithProviders, NgModule} from '@angular/core';
import {AuthService} from './services/auth.service';
import { CallbackComponent } from './components/callback/callback.component';
import {ConfigurationModel} from './models/configuration.model';
import {LoggedInAuthGuardService} from './route-guards/logged-in.auth-guard.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './http-interceptors/token-interceptor';

@NgModule({
  declarations: [CallbackComponent],
  exports: [CallbackComponent]
})
export class LdgAuth0SvcModule {
  static forRoot(configuration: ConfigurationModel): ModuleWithProviders {
    return {
      ngModule: LdgAuth0SvcModule,
      providers: [
        AuthService,
        {
          provide: ConfigurationModel,
          useValue: configuration
        },
        LoggedInAuthGuardService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        }
      ]
    };
  }
}
