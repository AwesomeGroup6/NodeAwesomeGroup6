import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {AuthGateService} from "../auth-gate.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private agS;

  friends: Observable<any[]>;
  posts: Observable<any[]>;


  constructor(agService: AuthGateService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.agS = agService;
    this.toastr.setRootViewContainerRef(vcr);
  }

  postForm = new FormGroup ({
    content: new FormControl(),
  });

  searchForm = new FormGroup ({
    name: new FormControl(),
  });



  ngOnInit() {
    //this.agS.getFriends();
    this.posts = this.agS.getPosts();
    //this.agS.getGroups();
  }

  createPost() {
    if(this.postForm.controls.content.value){
      this.agS.createPost(this.postForm.controls.content.value);
    }else {

    }
  }

   findFriends(event){
    if(event.keyCode == 13) {
     this.friends =  this.agS.findFriends(this.searchForm.controls.name.value);
    }
  }


  sendFriendReq(FriendUserId){
    //TODO
    console.log(FriendUserId)
  }
}
