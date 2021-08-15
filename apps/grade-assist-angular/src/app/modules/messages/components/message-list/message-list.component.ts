import { Component, OnInit } from '@angular/core';
import { IConversation } from '@grade-assist/data';

@Component({
  selector: 'grade-assist-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit {
  messages: IConversation[] = [];

  //   constructor() {}

  ngOnInit() {
    console.log('init');
  }

  onConvoSelected(conv: any) {
    console.log(conv);
    // this.selectedConvo = conv;
  }
}
