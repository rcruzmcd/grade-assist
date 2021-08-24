import { Component, OnInit } from '@angular/core';
import { IConversation } from '@grade-assist/data';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import * as rootState from '../../../../store/reducers/root-state';

interface idMessage {
  [id: string]: IConversation;
}

@Component({
  selector: 'grade-assist-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit {
  // messages: IConversation[] = [];
  loggedInUser?: any;
  convos?: idMessage;
  constructor(private store: Store<rootState.RootState>) {}
  ngOnInit(): void {
    this.store.subscribe((state) => {
      // this.messages = state.messages?.conversations;
      this.convos = state.messages.convos;
      this.loggedInUser = state.auth.user;
    });

    this.store.dispatch({
      type: fromStore.MessagesActions.GET_MESSAGES,
      payload: {
        userId: this.loggedInUser._id,
      },
    });
  }

  onConvoSelected(conv: any) {
    this.store.dispatch({
      type: fromStore.MessagesActions.SELECT_CONVERSATION,
      payload: conv,
    });
    // this.selectedConvo = conv;
  }

  getParticipants(conv: any) {
    if (conv) {
      const participants = conv.participants.filter(
        (person: any) => person._id != this.loggedInUser._id
      );
      const stringParticipants = participants.map(
        (person: any) => person.firstName + ' ' + person.lastName
      );
      return stringParticipants;
    } else {
      return '';
    }
  }

  getPrevText(conv: any) {
    if (conv) {
      const prevText = conv.messages[0].message;
      return `${prevText.slice(0, 10)}...`;
    } else {
      return '';
    }
  }

  getUpdateDate(conv: any) {
    return conv?.updatedAt;
  }
}
