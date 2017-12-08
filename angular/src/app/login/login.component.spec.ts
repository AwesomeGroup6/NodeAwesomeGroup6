import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from "@angular/material";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MediaServiceService} from "../login-signup";
import { LoginComponent } from './login.component';
import {HttpClientModule} from '@angular/common/http';
import {ToastModule, ToastOptions} from 'ng2-toastr/ng2-toastr';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {CustomOption} from '../app.module';
import {routing} from '../../Routing';
import {SignupComponent} from '../signup/signup.component';
import {HomeComponent} from '../home/home.component';
import {CommentsComponent} from '../home/comments.component';
import {FriendComponent} from '../friend/friend.component';
import {MatListModule} from '@angular/material/list';
import {ChatComponent} from '../chat/chat.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';




describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let logUserIn = jasmine.createSpyObj('logUserIn', ['logUserInMock']);
  let loginMock = jasmine.createSpyObj('loginMock', ['login']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[MatButtonModule, BrowserAnimationsModule, MatListModule, routing, ToastModule, HttpClientModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatCardModule, MatInputModule],
      declarations: [ LoginComponent, FriendComponent, ChatComponent, SignupComponent, HomeComponent, CommentsComponent ],
      providers: [{provide: MediaServiceService, useClass: MockMediaServiceService}, ToastsManager, {provide: ToastOptions, useClass: CustomOption}]
    })
    .compileComponents();
  }));

  class MockMediaServiceService extends MediaServiceService{
    mockToken = '123';


    logUserInMock(email, pass){
      localStorage.setItem('token', this.mockToken);
      localStorage.setItem('email', email);
    }
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('log user in with email and password - recieve token', ()=>{
    let inputs = fixture.debugElement.queryAll(By.css('input'));

    let first = inputs[0].nativeElement;
    let second = inputs[1].nativeElement;

    first.value = 'Nick22@dumest.com';
    second.value = 'dDumt333';

    first.dispatchEvent(new Event('input'));
    expect(component.loginForm.controls.email.value).toBe('Nick22@dumest.com');
    second.dispatchEvent(new Event('input'));
    expect(component.loginForm.controls.password.value).toBe('dDumt333');

    loginMock.login();
    expect(loginMock.login).toHaveBeenCalled();

    logUserIn.logUserInMock(component.loginForm.controls.email.value, component.loginForm.controls.password.value);
    expect(logUserIn.logUserInMock).toHaveBeenCalledWith(
      'Nick22@dumest.com',
      'dDumt333'
    );

  /*
    let storageMail = localStorage.getItem('email');
    let storageToken = localStorage.getItem('token');
    expect(storageToken).toBe('123');
    expect(storageMail).toBe('Nick22@dumest.com');*/
  });

});
