import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

declare var window;

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loginerror: string;
  token: any;
  username: any;
  isAuthenticated: boolean;
  private authStatusListener = new Subject<boolean>();
  tokenTimer:any;
  constructor(private router: Router,private formBuilder: FormBuilder,private authservice: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log(this.loginForm.value);
    this.authservice.adminlogin(this.loginForm.value.username, this.loginForm.value.password)
    .subscribe((response:any) => {
      console.log(response);
      if (response.status==true) {
      const username = response.username;
      this.token = response.token;
      this.username = username;
        const expiresInDuration = response.expiresIn;
        this.setAuthDuration(expiresInDuration);
        this.isAuthenticated = true;
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(this.token, expirationDate);
        window.header.admin();
        this.router.navigate(['/adminpanel']);

      }
      else{
        this.loginerror = "Username or password is incorrect";
        setTimeout(() => {
          this.loginerror = "";
        }, 5000);
      }
    }, error => {
     
      this.authStatusListener.next(false);
    });

  }

  private setAuthDuration(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.authservice.logout();
    }, duration * 1000);
  }

  private saveAuthData(tpken: string, expirationDate: Date) {
    localStorage.clear();
    localStorage.setItem('token', this.token);
    localStorage.setItem('username', this.username);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

}
