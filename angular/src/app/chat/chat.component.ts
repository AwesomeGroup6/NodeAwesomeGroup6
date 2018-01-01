import {Component, OnDestroy, OnInit, ElementRef, ViewChild} from '@angular/core';
import {ChatService} from '../chat.service';
import {MediaServiceService} from "../login-signup";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  messages = [];
  users = [];

  connection;
  user;
  userName;
  message;
  private ms;
  private home;
  friendName;
  trial;

  constructor(home: HomeComponent,ms : MediaServiceService,private chatService:ChatService, private router:Router) {
    this.ms = ms;
    this.home = home;
  }


  sendMessage(event){

    console.log(this.messages.length);
    console.log(this.users.length);
    if(event.keyCode == 13) {


      this.userName = this.ms.currentUser.FirstName;
      this.friendName = this.home.a;
      console.log(this.userName);
/*
      this.chatService.addUser(this.userName);
*/
      this.chatService.sendMessage(this.message,this.friendName,this.userName);
      this.message = '';

    }
  }

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);

    });

/*
    this.connection = this.chatService.getUser().subscribe(user => {
      this.users.push(user);


    });*/

  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
