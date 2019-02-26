import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../../ldg-auto0-svc/src/lib/services/auth.service';

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
    this.auth.login();
  }

}
