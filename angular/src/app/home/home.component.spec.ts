import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {ChatComponent} from '../chat/chat.component';
import {SignupComponent} from '../signup/signup.component';
import {PagenotfoundComponent} from '../pagenotfound/pagenotfound.component';
import {CommentsComponent} from './comments.component';
import {FriendComponent} from '../friend/friend.component';
import {LoginComponent} from '../login/login.component';
import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {AuthGateService} from '../auth-gate.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule, ToastOptions, ToastsManager} from 'ng2-toastr';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {MatButtonModule, MatDialog, MatDialogModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {routing} from '../../Routing';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import {CustomOption} from '../app.module';
import {ChatService} from '../chat.service';
import {By} from '@angular/platform-browser';
import {User} from '../user';



class MockAGS extends AuthGateService {
  testFriends = ['Jens', 'JensS'];
  testGroup = 'Group1';

  createPostMock(content) {
    console.log(content);
  }

  getPostsMock = jasmine.createSpy('getPostsMock').and.callFake(
    () => Promise
      .resolve(true)
      .then(() => Object.assign({}, this.testFriends)));

  findGroupsMock = jasmine.createSpy('findGroupsMock').and.callFake(
    () => Promise
      .resolve(true)
      .then(() => Object.assign({}, this.testGroup)))


}


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let agsMock = jasmine.createSpyObj('agsMock', ['createPostMock', 'getPostsMock', 'findGroupsMock']);
  let homeMock = jasmine.createSpyObj('homeMock', ['createPost']);


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent,
        HomeComponent,
        FriendComponent,
        PagenotfoundComponent,
        LoginComponent,
        CommentsComponent,
        ChatComponent],
      imports:[MatButtonModule, MatDialogModule, BrowserAnimationsModule, MatListModule, routing, ToastModule, HttpClientModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatCardModule, MatInputModule],
      providers: [{provide:AuthGateService, useClass: MockAGS}, ChatService, ToastsManager, {provide: ToastOptions, useClass: CustomOption}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('create post', ()=>{
    let inputs = fixture.debugElement.queryAll(By.css('#post'));

    let content = inputs[0].nativeElement;

    content.value = 'Hey';

    content.dispatchEvent(new Event('input'));
    expect(component.postForm.controls.content.value).toBe('Hey');

    homeMock.createPost();
    expect(homeMock.createPost).toHaveBeenCalled();

    agsMock.createPostMock(content.value);
    expect(agsMock.createPostMock).toHaveBeenCalledWith('Hey');
  });


  it('view friends', fakeAsync(()=>{
    agsMock.getPostsMock();
    expect(agsMock.getPostsMock.calls.count()).toBe(1,['Jens', 'JensS']);
  }));



  it('find group', fakeAsync(()=>{
    let inputs = fixture.debugElement.queryAll(By.css('#groupName'));
    let content = inputs[0].nativeElement;
    content.value = 'Group1';
    content.dispatchEvent(new Event('input'));

    agsMock.findGroupsMock();
    expect(agsMock.findGroupsMock.calls.count()).toBe(1, 'Group1');

    expect(content.value).toBe('Group1');
  }))
});
