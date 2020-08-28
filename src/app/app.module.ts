import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { UserComponent } from './user/user.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { UserpanelComponent } from './userpanel/userpanel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminloginComponent,
    UserComponent,
    AdminpanelComponent,
    UserpanelComponent,
    WelcomeComponent,
    LeaderboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
