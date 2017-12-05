import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import { MatButtonModule } from "@angular/material";
import {MatFormFieldModule} from '@angular/material/form-field';
import { MediaServiceService} from "./login-signup";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {ToastModule, ToastOptions} from 'ng2-toastr/ng2-toastr';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';

//IMPORT ANGULAR-MATERIAL COMPONENTS TO USE COMPONENTS TO USE

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { FriendComponent } from './friend/friend.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';
import {routing} from "../Routing";
import {AuthGuard} from "./auth-guard.service";
import {AuthGateService} from "./auth-gate.service";
import { CommentsComponent } from './home/comments.component';

export class CustomOption extends ToastOptions {
  showCloseButton = true;
  dismiss: 'click';
  animate: 'flyRight';
}


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    FriendComponent,
    PagenotfoundComponent,
    LoginComponent,
    CommentsComponent
  ],
  entryComponents: [CommentsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    ReactiveFormsModule,
    ToastModule.forRoot(),
    MatDialogModule,
    MatCardModule,
    FormsModule,
    MatListModule,
    MatInputModule,
    routing,
    MatFormFieldModule
  ],
  providers: [MediaServiceService, AuthGuard, {provide: ToastOptions, useClass: CustomOption}, AuthGateService],
  bootstrap: [AppComponent]
})
export class AppModule { }

