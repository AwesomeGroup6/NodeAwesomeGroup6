import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {AuthGateService} from "../auth-gate.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";
import {async} from 'rxjs/scheduler/async';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private agS;

  friends: Observable<any[]>;
  posts: Observable<any[]>;
  groups: Observable<any[]>;
  currFriends: Observable<any[]>;
  fRQs: Observable<any>;
  findGs: Observable<any>;

  constructor(agService: AuthGateService, public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router) {
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
    setTimeout(() => {
    this.posts = this.agS.getPosts();
    }, 1000);
    setTimeout(() => {
    this.groups = this.agS.getGroups();
    }, 2000);
    setTimeout(() => {
      this.fRQs = this.agS.getFRs();
    }, 3000);
  }

  createPost() {
    if(this.postForm.controls.content.value){
      this.agS.createPost(this.postForm.controls.content.value);
      this.toastr.success('', 'Post submitted');
    }else {

    }
  }

  createComment(event) {
    if(event.keyCode == 13) {
      if (this.postForm.controls.content.value) {
        this.agS.createPost(this.postForm.controls.content.value);
      } else {

      }
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
    console.log(gId);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
