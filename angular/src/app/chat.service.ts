import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {HttpClient} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";


@Injectable()
export class ChatService {
  private url = 'http://localhost:5000';
  private socket;
  private token: string;
  private user;

  constructor(private http: HttpClient) {}


  sendMessage(message,friendname,username){

    this.socket.emit('private-message', {message:message,username:friendname,a:username});
  }

  addUser(username){
    console.log("service"+ username);
    this.socket.emit("add-user",{username:username})
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('add-message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

/*
  getUser() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('new-user', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }*/




  /* display(){
       return new Promise((resolve, reject) =>{
         this.http.get(this.url + '/chat', {
 /!*
           headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
 *!/
         },)
           .subscribe(data =>{

             console.log("hi");

           }, error =>{
             console.log(error);
             reject(error)
           })
       })
     }*/



}
