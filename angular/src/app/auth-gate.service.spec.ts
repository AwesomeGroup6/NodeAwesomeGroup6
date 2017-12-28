import { TestBed, inject } from '@angular/core/testing';

import { AuthGateService } from './auth-gate.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {ToastModule, ToastOptions, ToastsManager} from 'ng2-toastr';
import {routing} from '../Routing';
import {MatButtonModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import {ChatComponent} from './chat/chat.component';
import {SignupComponent} from './signup/signup.component';
import {CommentsComponent} from './home/comments.component';
import {FriendComponent} from './friend/friend.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {CustomOption} from './app.module';
import { AuthComponent } from './auth/auth.component';

describe('AuthGateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[MatButtonModule, BrowserAnimationsModule, MatListModule, routing, ToastModule, HttpClientModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatCardModule, MatInputModule],
      declarations: [ LoginComponent, FriendComponent, ChatComponent, SignupComponent, HomeComponent, CommentsComponent, AuthComponent ],
      providers: [AuthGateService, ToastsManager, {provide: ToastOptions, useClass: CustomOption}]
    });
  });

  it('should be created', inject([AuthGateService], (service: AuthGateService) => {
    expect(service).toBeTruthy();
  }));
});
