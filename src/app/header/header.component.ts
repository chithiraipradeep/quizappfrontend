import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

declare var window;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  token: any;
  username: any;
  isadmin: boolean = false;
  isuser: boolean = false;
  constructor(private authservice: AuthService) {
    window.header = this;
  }

  ngOnInit(): void {
    if(localStorage.getItem('isadmin')=="true"){
      this.isadmin=true;
      this.isuser=false;
    }
    if(localStorage.getItem('isuser')=="true"){
      this.isuser=true;
      this.isadmin=false;
    }

  }

  admin() {
    this.token = localStorage.getItem('token');
    this.username = localStorage.getItem('username');
    localStorage.setItem("isadmin", "true");
    localStorage.setItem("isuser", "false");
    this.ngOnInit();
  }

  user() {
    this.token = localStorage.getItem('token');
    this.username = localStorage.getItem('username');
    localStorage.setItem("isadmin", "false");
    localStorage.setItem("isuser", "true");
    this.ngOnInit();
  }

  logout() {
    this.isadmin=false;
    this.isuser=false;
    this.authservice.logout();
  }

}
