import { TestBed, inject } from '@angular/core/testing';

import { MediaServiceService } from './login-signup';
import {ChatComponent} from './chat/chat.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {SignupComponent} from './signup/signup.component';
import {CommentsComponent} from './home/comments.component';
import {MatListModule} from '@angular/material/list';
import {LoginComponent} from './login/login.component';
import {ToastModule, ToastOptions, ToastsManager} from 'ng2-toastr';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomOption} from './app.module';
import {FriendComponent} from './friend/friend.component';
import {HomeComponent} from './home/home.component';
import {AuthGateService} from './auth-gate.service';
import {routing} from '../Routing';
import {MatButtonModule} from '@angular/material';

describe('MediaServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[MatButtonModule, BrowserAnimationsModule, MatListModule, routing, ToastModule, HttpClientModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatCardModule, MatInputModule],
      declarations: [ LoginComponent, FriendComponent, ChatComponent, SignupComponent, HomeComponent, CommentsComponent ],
      providers: [MediaServiceService, ToastsManager, {provide: ToastOptions, useClass: CustomOption}]

    });
  });

  it('should be created', inject([MediaServiceService], (service: MediaServiceService) => {
    expect(service).toBeTruthy();
  }));
});
