import { Component, OnInit } from '@angular/core';
import { UserData } from '../models/user-data.model';
import { Subscription } from 'rxjs';
import { LeaderboardService } from '../services/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  isLoading = false;
  users: UserData[] = [];
  private usersSub: Subscription;
  
  constructor(private leaderboard: LeaderboardService) { }

  ngOnInit() {
    this.isLoading = true;
    this.leaderboard.getData();
    this.usersSub = this.leaderboard.getMarksUpdateListener()
    .subscribe((user: { user: UserData[] }) => {
      this.isLoading = false;
      this.users = user.user;
    });
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }
}
