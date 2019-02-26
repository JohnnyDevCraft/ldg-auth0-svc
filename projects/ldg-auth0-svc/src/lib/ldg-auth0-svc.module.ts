import {ModuleWithProviders, NgModule} from '@angular/core';
import {AuthService} from './services/auth.service';
import { CallbackComponent } from './components/callback/callback.component';
import {ConfigurationModel} from './models/configuration.model';

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
          provide: AuthService,
          useValue: configuration
        }
      ]
    };
  }
}
