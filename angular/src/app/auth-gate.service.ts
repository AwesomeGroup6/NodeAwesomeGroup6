import {Injectable, OnInit} from '@angular/core';
import {ToastsManager} from "ng2-toastr";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {split} from "ts-node/dist";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {User} from "./user";
import {reject} from "q";

@Injectable()
export class AuthGateService{


  private testUrl = 'http://localhost:3000/';
  private token: string;

  friends: Observable <User>;
  posts: Observable<any>;

  constructor(private http: HttpClient, private push: ToastsManager, private router:Router) {}


 //TODO all request in here

  getFriends(){
    this.http.get(this.testUrl+'home/friends', {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('token'))
    },)
      .subscribe(data =>{
        console.log(data);

      }, error =>{
        console.log(error);

      })
  }

  getPosts(){
    return new Promise((resolve, reject) =>{
    this.http.get(this.testUrl+'home/posts', {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('token'))
    },)
      .subscribe(data =>{
        this.posts = data['result'];
        console.log(data);
        resolve(this.posts);

      }, error =>{
        this.push.error('Unable to get posts', 'An error occurred')
        console.log(error);
        reject(error);

      })
    })
  }

  getGroups(){
    this.http.get(this.testUrl+'home/groups', {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('token'))
    },)
      .subscribe(data =>{
        console.log(data);

      }, error =>{
        console.log(error);

      })
  }

  createPost(content){
    console.log(content);
    this.http.post(this.testUrl+'auth/createpost', {
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
      this.http.post(this.testUrl + 'home/findFriend', {
        FirstName: aName[0], LastName: aName[1]
      }, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      },)
        .subscribe(data => {
            this.friends = data['result'];
            console.log(this.friends);
          resolve(this.friends)

          },
          error => {
            console.log(error);
            reject(error);
        });
    });

  }

  makeFR(){

  }


}
