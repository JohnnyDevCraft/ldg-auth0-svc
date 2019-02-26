import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LdgAuth0SvcModule} from '../../../ldg-auto0-svc/src/lib/ldg-auth0-svc.module';
import {ConfigurationModel} from '../../../ldg-auto0-svc/src/lib/models/configuration.model';
import {Settings} from 'tsickle/src/main';
import {Route, RouterModule} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CallbackComponent} from '../../../ldg-auto0-svc/src/lib/components/callback/callback.component';
import {AuthGuardService} from '../../../ldg-auto0-svc/src/lib/route-guards/logged-in.auth-guard.service';

const routes: Route[] = [
  {path: 'home', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'auth-hook', component: CallbackComponent},
  {path: '**', redirectTo: 'home'}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    LdgAuth0SvcModule.forRoot(
      {
      Settings: {
        callbackRouteName: 'auth-hook',
        unauthorizedRouteName: 'home',
        postCallbackRouteName: 'dashboard',
        postLogoutRouteName: 'home'
      },
      Config: {
        clientID: 'oWw9pkKjPZ5X42to7AZa6uVl4Q3XOTs0',
        domain: 'blazor-budget2.auth0.com',
        responseType: 'token id_token',
        redirectUri: 'http://localhost:4200/auth-hook',
        audience: 'agile-family',
        scope: 'openid profile full-access'
      }
      })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
