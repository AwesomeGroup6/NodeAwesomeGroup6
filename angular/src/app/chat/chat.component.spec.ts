import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {ToastModule} from 'ng2-toastr';
import {routing} from '../../Routing';
import {MatButtonModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import {SignupComponent} from '../signup/signup.component';
import {CommentsComponent} from '../home/comments.component';
import {FriendComponent} from '../friend/friend.component';
import {HomeComponent} from '../home/home.component';
import {LoginComponent} from '../login/login.component';
import {ChatService} from '../chat.service';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[MatButtonModule, BrowserAnimationsModule, MatListModule, routing, ToastModule, HttpClientModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatCardModule, MatInputModule],
      declarations: [ChatComponent, LoginComponent, FriendComponent, ChatComponent, SignupComponent, HomeComponent, CommentsComponent ],
      providers: [ChatService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
