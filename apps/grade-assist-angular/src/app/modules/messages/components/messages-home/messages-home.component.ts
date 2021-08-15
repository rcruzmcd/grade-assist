import { Component, OnInit } from '@angular/core';
import { IConversation } from '@grade-assist/data';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../store';

@Component({
  selector: 'grade-assist-messages-home',
  templateUrl: './messages-home.component.html',
  styleUrls: ['./messages-home.component.scss'],
})
export class MessagesHomeComponent implements OnInit {
  loggedInUser: any;
  messages: IConversation[] = [];
  selectedConvo!: IConversation;
  // conversation:IConversation = [];
  userText = '';

  constructor(private store: Store<fromStore.State>) {}
  ngOnInit(): void {
    this.store.subscribe((state) => {
      console.log(state);
    });
  }

  onConvoSelected(conv: any) {
    console.log(conv);
    this.selectedConvo = conv;
  }

  onSend() {
    console.log(this.userText);
  }
}
