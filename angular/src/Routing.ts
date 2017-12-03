import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./app/login/login.component";
import {HomeComponent} from "./app/home/home.component";
import {AuthGuard} from "./app/auth-guard.service";
import {FriendComponent} from "./app/friend/friend.component";
import {SignupComponent} from "./app/signup/signup.component";


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'home' , canActivate:[AuthGuard], component: HomeComponent },
  { path: 'friend', canActivate:[AuthGuard], component: FriendComponent},
  { path: '**',  redirectTo: '/login', pathMatch: 'full'},

];


export const routing = RouterModule.forRoot(appRoutes);
