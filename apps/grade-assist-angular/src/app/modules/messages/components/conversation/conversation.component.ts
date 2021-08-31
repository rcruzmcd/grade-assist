import { Component, OnInit } from '@angular/core';
import { IConversation, User } from '@grade-assist/data';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import * as rootState from '../../../../store/reducers/root-state';

@Component({
  selector: 'grade-assist-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {
  selectedConvo?: IConversation;
  userText = '';
  loggedInUser: any;
  userList: User[] = [];
  isEditingRecipient = true;
  recipient: User[] = [];

  constructor(private store: Store<rootState.RootState>) {}
  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.loggedInUser = state.auth.user;

      if (state.messages.userList) this.userList = state.messages.userList;

      if (
        state.messages.selectedConversation &&
        this.selectedConvo?._id !== state.messages.selectedConversation?._id
      ) {
        // reset to array as empty for new conversation selected
        this.isEditingRecipient = false;
        this.recipient = [];
        this.selectedConvo = state.messages.selectedConversation;

        // filter out logged in user from participants
        const _to: any = this.selectedConvo?.participants.filter(
          (person: any) => person._id != this.loggedInUser._id
        );

        // copy of partipants
        const __to: any = [..._to];

        // push participants to array
        for (const person of __to) {
          this.recipient.push(person);
        }
      } else {
        this.selectedConvo = state.messages.selectedConversation;
      }

      const el = document.getElementById('message_content');
      if (el) el.scrollTop = el.scrollHeight;
    });
  }

  onSend() {
    const receivers = this.recipient.map((to) => to._id);
    const message = {
      sender: this.loggedInUser?._id,
      receivers: receivers,
      messageText: this.userText,
      convoId: this.selectedConvo?._id,
    };
    this.store.dispatch({
      type: fromStore.MessagesActions.SEND_MESSAGES,
      payload: message,
    });
    this.userText = '';
  }

  getUserName(id: any): string {
    if (this.selectedConvo) {
      for (const participant of this.selectedConvo?.participants) {
        const person: any = participant;
        if (person._id === id[0]) {
          return `${person.firstName} ${person.lastName}`;
        }
      }
    }

    return '';
  }
}
