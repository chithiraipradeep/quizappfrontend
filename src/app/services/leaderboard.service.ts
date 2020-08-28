import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { environment } from "../../environments/environment";

import { UserData } from '../models/user-data.model';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private users: UserData[] = [];
  private usersUpdated = new Subject<{ user: UserData[]}>();

  constructor(private http: HttpClient) { }

  getData() {
    this.http.get<{ users: UserData[] }>(apiUrl + '/leaderboard')
    .subscribe((response) => {
      this.users = response.users;
      this.usersUpdated.next({ user: this.users });
    });
  }

  getMarksUpdateListener() {
    return this.usersUpdated.asObservable();
  }
}
