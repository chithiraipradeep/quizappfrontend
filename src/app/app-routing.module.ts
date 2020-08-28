import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { UserComponent } from './user/user.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { UserpanelComponent } from './userpanel/userpanel.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'userpanel', component: UserpanelComponent },
  { path: 'adminlogin', component: AdminloginComponent },
  { path: 'adminpanel', component: AdminpanelComponent },
  { path: 'leaderboard', component: LeaderboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
