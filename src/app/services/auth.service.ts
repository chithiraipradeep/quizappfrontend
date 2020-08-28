import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../models/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from "../../environments/environment";

const apiUrl = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient, private router: Router) { }

    private token: string;
    private username: string;
    private isAuthenticated = false;
    private tokenTimer: any;
    private authStatusListener = new Subject<boolean>();


    getIsAuth() {
        return this.isAuthenticated;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }


    createUser(username: string, password: string) {
        const authData: AuthData = { username: username, password: password };
        return this.http.post(apiUrl + '/auth/signup', authData);
            
    }

    login(username: string, password: string) {
        const authData: AuthData = { username: username, password: password };
        return this.http.post<{ token: string, username: string, expiresIn: number }>(apiUrl + "/auth/login", authData);
    }

    adminlogin(username: string, password: string) {
        const authData: AuthData = { username: username, password: password };
        return this.http.post<{ token: string, username: string, expiresIn: number }>(apiUrl + "/adminauth/login", authData);
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        localStorage.clear();
        this.router.navigate(['/']);
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('expiration');
    }

    
}
