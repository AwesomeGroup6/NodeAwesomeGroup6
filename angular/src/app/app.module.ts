import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import { MatButtonModule } from "@angular/material";
import {MatFormFieldModule} from '@angular/material/form-field';
import { MediaServiceService} from "./media-service.service";
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';


//IMPORT ANGULAR-MATERIAL COMPONENTS TO USE COMPONENTS TO USE

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { FriendComponent } from './friend/friend.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';
import {User} from "./user";


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'home', component: HomeComponent },
  { path: 'friend', component: FriendComponent},
  {path: '**', redirectTo: '/login', pathMatch: 'full'},

];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    FriendComponent,
    PagenotfoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
  ],
  providers: [MediaServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
