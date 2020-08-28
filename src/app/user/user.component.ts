import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

declare var window;


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  submitted = false;
  rsubmitted = false;
  selectedIndex: number = 0;
  error: any;
  token: string;
  username: string;
  isAuthenticated: boolean;
  private authStatusListener = new Subject<boolean>();
  tokenTimer:any;
  loginerror: string;

  constructor(private router: Router, private formBuilder: FormBuilder, private authservice: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.formBuilder.group({
      rusername: ['', [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      rpassword: ['', [Validators.required, Validators.minLength(6)]],
    });

  }

  get f() { return this.loginForm.controls; }
  get rf() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authservice.login(this.loginForm.value.username, this.loginForm.value.password)
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
          window.header.user();
          this.router.navigate(['/userpanel']);
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

    console.log(this.loginForm.value);
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

  register() {
    this.rsubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.authservice.createUser(this.registerForm.value.rusername, this.registerForm.value.rpassword)
      .subscribe((response: any) => {
        console.log(response);
        if (response.status == true) {
          this.selectedIndex = this.selectedIndex - 1;
          this.registerForm.reset();
        }
        else {
          console.log(response.message);
          this.error = response.message;
          setTimeout(() => {
            this.error = "";
          }, 5000);
        }
      }, error => {
      }
      );
    console.log(this.registerForm.value);
  }

}
