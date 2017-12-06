import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  messages = [];
  connection;
  message;
  userEmail = localStorage.getItem('email');

  constructor(private chatService:ChatService) {}

  sendMessage(event){
    if(event.keyCode == 13) {
      this.chatService.sendMessage(this.message);
      this.message = '';
    }
  }

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
