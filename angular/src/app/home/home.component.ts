import {Component, OnInit, ViewContainerRef, Input} from '@angular/core';
import {AuthGateService} from "../auth-gate.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";
import {MatDialog} from '@angular/material';
import {CommentsComponent} from './comments.component';
import {MediaServiceService} from "../login-signup";
import {ChatService} from "../chat.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  entryComponents: [CommentsComponent],

})
export class HomeComponent implements OnInit{
  private agS;
  private ms;
  private chat;
  private click = true;
  private count = 0;
   a;
  private target;
  private b=1;

  friends: Observable<any[]>;
  posts: Observable<any[]>;
  groups: Observable<any[]>;
  currFriends: Observable<any[]>;
  fRQs: Observable<any>;
  findGs: Observable<any>;
  currentComments: Observable<any>;
  currentUser: Observable<any>;



  constructor(chat: ChatService,ms : MediaServiceService,agService: AuthGateService, public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router, public dialog: MatDialog) {
    this.ms = ms;
    this.chat = chat;
    this.agS = agService;
    this.toastr.setRootViewContainerRef(vcr);

  }

  postForm = new FormGroup ({
    content: new FormControl(),
  });

  searchForm = new FormGroup ({
    name: new FormControl(),
  });

  commentForm = new FormGroup ({
    content: new FormControl(),
  });

  groupForm = new FormGroup ({
    name: new FormControl(),
  });

  ngOnInit() {
    this.currFriends = this.agS.getFriends();
    this.posts = this.agS.getPosts();
    this.groups = this.agS.getGroups();
    this.fRQs = this.agS.getFRs();
    this.currentUser = this.ms.currentUser;


  };


  createPost() {
    if(this.postForm.controls.content.value){
      this.agS.createPostService(this.postForm.controls.content.value);
      this.toastr.success('', 'Post submitted');
    }else {

    }
  }

  createComment(event, pId) {
    if(event.keyCode == 13) {
      this.agS.createComment(this.commentForm.controls.content.value, pId);
    }
  }
   findFriends(event){
    if(event.keyCode == 13) {
     this.friends =  this.agS.findFriends(this.searchForm.controls.name.value);
    }
  }


  sendFriendReq(FriendUserId){
    this.agS.makeFR(FriendUserId);
  }

  acceptFR(FriendUserId){
    this.agS.acceptFR(FriendUserId);
  }

  declineFR(FriendUserId){
    this.agS.declineFR(FriendUserId);
  }

  findGroup(event){
    if(event.keyCode == 13) {
      this.findGs =  this.agS.findGroups(this.groupForm.controls.name.value);
    }
  }

  joinGroup(gId){
   this.agS.joinGroup(gId);
  }

  getComments(pId){
    this.currentComments = this.agS.getComments(pId);
    let dialogRef = this.dialog.open(CommentsComponent, {
      width: '500px',
      data: this.currentComments
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  };

  talk(userName){

    this.a = userName;



    console.log(this.a);


    if(this.count<1) {
      this.click = false;
      this.chat.addUser(this.ms.currentUser.FirstName);
      this.count++;
    }
    else{
      this.click = true;
      this.count = 0;
    }
  };



}


