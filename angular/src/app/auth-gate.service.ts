import {Injectable} from '@angular/core';
import {ToastsManager} from "ng2-toastr";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {User} from "./user";

@Injectable()
export class AuthGateService{


  private testUrl = 'http://localhost:3000/';
  private token: string;

  friends: Observable <User>;
  posts: Observable<any>;
  groups: Observable<any>;
  currFriends: Observable<User>;
  fRQs: Observable<any>;
  fGs: Observable<any>;
  currComments: Observable<any>;


  constructor(private http: HttpClient, private push: ToastsManager, private router: Router) {}




  getFriends(){
    return new Promise((resolve, reject) =>{
    this.http.get(this.testUrl + 'friends/', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    },)
      .subscribe(data =>{
        this.currFriends = data['friends'];
        console.log(data);
        resolve(this.currFriends);

      }, error =>{
        console.log(error);
        reject(error)
      })
    })
  }

  getPosts(){
    return new Promise((resolve, reject) =>{
    this.http.get(this.testUrl+'posts/', {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('token'))
    },)
      .subscribe(data =>{
        this.posts = data['posts'];
        console.log(data);
        resolve(this.posts);

      }, error =>{
        this.push.error('Unable to get posts', 'An error occurred');
        console.log(error);
        reject(error);

      })
    })
  }

  getGroups(){
    return new Promise((resolve, reject) => {
      this.http.get(this.testUrl + 'groups/', {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      },)
        .subscribe(data => {
          this.groups = data['groups'];
          console.log(data);
          resolve(this.groups);

        }, error => {
          console.log(error);
          reject(error);
        })
    });
  }


  getFRs(){
    return new Promise((resolve, reject) => {
      this.http.post(this.testUrl + 'friendshipRequest/friendrequest', {},{
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      })
        .subscribe(data => {
          this.fRQs = data['result'];
          console.log(data);
          resolve(this.fRQs);

        }, error => {
          console.log(error);
          reject(error);
        })
    });
  }

  createPostService(content){
    console.log(content);
    this.http.post(this.testUrl+'posts/createpost', {
      PostContent: content
    }, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    },)
      .subscribe(data =>{

      }, error =>{
        console.log(error);

      })
  }


  findFriends(content){

    let aName = content.split(' ');

    console.log(aName[0], aName[1]);
    return new Promise((resolve, reject) =>
    {
      this.http.post(this.testUrl + 'friends/findFriend', {
        FirstName: aName[0], LastName: aName[1]
      }, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      },)
        .subscribe(data => {
          this.friends = data['result'];
          resolve(this.friends)
          },
          error => {
            console.log(error);
            reject(error);
        });
    });
  }

  findGroups(content){
    return new Promise((resolve, reject) =>
    {
      this.http.post(this.testUrl + 'groups/findGroup', {
        title: content
      }, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      },)
        .subscribe(data => {
          console.log(data);
            this.fGs = data['result'];
            resolve(this.fGs)

          },
          error => {
            console.log(error);
            reject(error);
          });
    });
  }

  makeFR(friendId){
    this.http.post(this.testUrl + 'friendshipRequest/createfriendrequest', {
      FriendId: friendId
    }, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    },).subscribe(data =>{
      if(data['request']){
        this.push.success('','Friend Request sent');
      }
    }, err =>{
      console.log(err);
    })
}

 acceptFR(friendId){
   this.http.post(this.testUrl + 'friendshipRequest/acceptFriendRequest', {
     UserId: friendId
   }, {
     headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
   }).subscribe(data =>{
     if(data['request']){
       this.push.success('','Friend Request accepted');
     }
   }, err =>{
     console.log(err);
   })

 }

  declineFR(friendId){
    this.http.post(this.testUrl + 'friendshipRequest/revokeFriendship', {
      FriendId: friendId
    }, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).subscribe(data =>{
      if(data['request']){
        this.push.success('','Friend Request accepted');
      }
    }, err =>{
      console.log(err);
    })

  }

  joinGroup(gId){
    this.http.post(this.testUrl + 'groups/joinGroup', {
      groupId: gId
    }, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).subscribe(data =>{
        this.push.success('','Joined group');
    }, err =>{
      console.log(err);
    })
  }

  createComment(content, pId){
    console.log(content, pId);
    this.http.post(this.testUrl+'comments/createcomment', {
      CommentText: content,
      PostId: pId
    }, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    },)
      .subscribe(data =>{
        this.push.success('','Comment created');
      }, error =>{
        console.log(error);

      })
  }


  getComments(pId){
    return new Promise((resolve, reject) =>{
      this.http.post(this.testUrl+'comments/', {
        PostId: pId
      },{
        headers: new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('token'))
      })
        .subscribe(data =>{
          this.currComments = data['comments'];
          console.log(data);
          resolve(this.currComments);

        }, error =>{
          this.push.error('Unable to get posts', 'An error occurred');
          console.log(error);
          reject(error);

        })
    })
  }
}
