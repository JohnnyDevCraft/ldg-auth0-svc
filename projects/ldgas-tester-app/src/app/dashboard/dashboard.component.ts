import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from 'ldg-auth0-svc';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  profile: any;
  get profileString(): string {
    return JSON.stringify(this.profile);
  }

  constructor(private authSvc: AuthService) {
    this.subscriptions.push(authSvc.UserProfile.subscribe(x => {
      console.log('Setting user profile to ' + JSON.stringify(x));
      this.profile = x;
    }));
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
