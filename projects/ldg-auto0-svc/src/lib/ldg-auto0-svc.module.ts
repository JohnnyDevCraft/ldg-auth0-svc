import {ModuleWithProviders, NgModule} from '@angular/core';
import {AuthService} from './services/auth.service';
import { CallbackComponent } from './components/callback/callback.component';
import {ConfigurationModel} from './models/ConfigurationModel';

@NgModule({
  declarations: [CallbackComponent],
  exports: [CallbackComponent]
})
export class LdgAuto0SvcModule {
  static forRoot(configuration: ConfigurationModel): ModuleWithProviders {
    return {
      ngModule: LdgAuto0SvcModule,
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
