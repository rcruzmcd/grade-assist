import { Component, OnInit } from '@angular/core';
import { IConversation } from '@grade-assist/data';

@Component({
  selector: 'grade-assist-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {
  selectedConvo!: IConversation;
  userText = '';
  loggedInUser: any;

  //   constructor() {}

  ngOnInit() {
    console.log('init');
  }

  onSend() {
    console.log(this.userText);
  }
}
