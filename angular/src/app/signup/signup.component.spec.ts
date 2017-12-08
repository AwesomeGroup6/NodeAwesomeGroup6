import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from "@angular/material";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MediaServiceService} from "../login-signup";
import {HttpClientModule} from '@angular/common/http';
import {ToastModule, ToastOptions} from 'ng2-toastr/ng2-toastr';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {CustomOption} from '../app.module';
import {routing} from '../../Routing';
import {HomeComponent} from '../home/home.component';
import {CommentsComponent} from '../home/comments.component';
import {FriendComponent} from '../friend/friend.component';
import {MatListModule} from '@angular/material/list';
import {ChatComponent} from '../chat/chat.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';
import { SignupComponent } from './signup.component';
import {LoginComponent} from '../login/login.component';


class MockSignMediaServiceService extends MediaServiceService{


  signUserUpMock (email, pass, first, last, phone, bod, gender){


  }
}

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let signUserInMock = jasmine.createSpyObj('signUserUp', ['signUserUpMock']);
  let signUp = jasmine.createSpyObj('signUp', ['signup']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[MatButtonModule, BrowserAnimationsModule, MatListModule, routing, ToastModule, HttpClientModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatCardModule, MatInputModule],
      declarations: [ LoginComponent, SignupComponent, FriendComponent, ChatComponent, SignupComponent, HomeComponent, CommentsComponent  ],
      providers: [{provide: MediaServiceService, useClass: MockSignMediaServiceService},ToastsManager, {provide: ToastOptions, useClass: CustomOption}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('fill out sign up', ()=>{
    let inputs = fixture.debugElement.queryAll(By.css('input'));

    let email = inputs[0].nativeElement;
    let password = inputs[1].nativeElement;
    let firstName = inputs[2].nativeElement;
    let lastName = inputs[3].nativeElement;
    let phoneNumber = inputs[4].nativeElement;
    let dob = inputs[5].nativeElement;
    let gender = inputs[6].nativeElement;

    let date = new Date().toString();


    email.value = 'Nick22@dumest.com';
    password.value = 'dDumt333';
    firstName.value = 'Nick';
    lastName.value = 'And';
    phoneNumber.value = 123;
    dob.value = date;
    gender.value = 'unknown';

    email.dispatchEvent(new Event('input'));
    password.dispatchEvent(new Event('input'));
    firstName.dispatchEvent(new Event('input'));
    lastName.dispatchEvent(new Event('input'));
    phoneNumber.dispatchEvent(new Event('input'));
    dob.dispatchEvent(new Event('input'));
    gender.dispatchEvent(new Event('input'));

    expect(component.signupForm.controls.email.value).toBe('Nick22@dumest.com');
    expect(component.signupForm.controls.password.value).toBe('dDumt333');
    expect(component.signupForm.controls.firstName.value).toBe('Nick');
    expect(component.signupForm.controls.lastName.value).toBe('And');
    expect(component.signupForm.controls.phoneNumber.value).toBe(123);
    expect(component.signupForm.controls.dob.value).toBe('');
    expect(component.signupForm.controls.gender.value).toBe('unknown');

    signUp.signup();
    expect(signUp.signup).toHaveBeenCalled();


    signUserInMock.signUserUpMock(email.value, password.value, firstName.value, lastName.value, phoneNumber.value, dob.value, gender.value);
    expect(signUserInMock.signUserUpMock).toHaveBeenCalledWith(
      'Nick22@dumest.com',
      'dDumt333',
      'Nick',
      'And',
      '123',
      '',
      'unknown'
    );
  });


});
