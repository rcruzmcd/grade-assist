import { Component, OnInit } from '@angular/core';
import { IConversation } from '@grade-assist/data';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';

@Component({
  selector: 'grade-assist-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit {
  messages: IConversation[] = [];
  loggedInUser?: any;
  constructor(private store: Store<fromStore.State>) {}
  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.messages = state.messages?.conversations;
      console.log(this.messages);
    });

    this.store.dispatch({
      type: fromStore.MessagesActions.GET_MESSAGES,
      payload: {
        userId: '611586657489f232af0ec37f',
      },
    });
  }

  onConvoSelected(conv: any) {
    console.log(conv);
    this.store.dispatch({
      type: fromStore.MessagesActions.SELECT_CONVERSATION,
      payload: conv,
    });
    // this.selectedConvo = conv;
  }

  getParticipants(conv: any) {
    const participants = conv.participants.filter(
      (person: any) => person._id == '611586657489f232af0ec37f'
    );
    const stringParticipants = participants.map(
      (person: any) => person.firstName + ' ' + person.lastName
    );
    return stringParticipants;
  }

  getPrevText(conv: any) {
    const prevText = conv.messages[0].message;
    return `${prevText.slice(0, 10)}...`;
  }
}
