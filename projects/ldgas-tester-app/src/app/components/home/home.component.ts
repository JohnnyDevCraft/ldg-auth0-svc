import { Component, OnInit } from '@angular/core';
import {AuthService} from 'ldg-auth0-svc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
  }

  logon() {
    console.log('attempting login.');
    this.auth.login();
  }

}
