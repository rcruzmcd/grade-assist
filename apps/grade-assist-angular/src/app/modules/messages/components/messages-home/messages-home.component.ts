import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../store';

@Component({
  selector: 'grade-assist-messages-home',
  templateUrl: './messages-home.component.html',
  styleUrls: ['./messages-home.component.scss'],
})
export class MessagesHomeComponent implements OnInit {
  //   loggedInUser: any;
  messages = [
    {
      lastTextPrev: 'some text...',
      userName: 'username',
      datetime: 'date/time',
      _id: '1234',
      conversation: [
        {
          type: 'send',
          message: 'hello',
          datetime: 'datetime',
        },
        {
          type: 'receive',
          message: 'hellosfasdfasdf',
          datetime: 'datetime',
        },
      ],
    },
    {
      lastTextPrev: 'some text...',
      userName: 'username',
      datetime: 'date/time',
      _id: '1234',
      conversation: [
        {
          type: 'send',
          message: 'hellosadfasdfasdfasdf',
          datetime: 'datetime',
        },
        {
          type: 'receive',
          message: 'hello',
          datetime: 'datetime',
        },
      ],
    },
    {
      lastTextPrev: 'some text...',
      userName: 'username',
      datetime: 'date/time',
      _id: '1234',
      conversation: [
        {
          type: 'send',
          message: 'hello',
          datetime: 'datetime',
        },
        {
          type: 'receive',
          message: 'hellsdfsadfsdafsdafdso',
          datetime: 'datetime',
        },
      ],
    },
    {
      lastTextPrev: 'some text...',
      userName: 'username',
      datetime: 'date/time',
      _id: '1234',
      conversation: [
        {
          type: 'send',
          message: 'hello',
          datetime: 'datetime',
        },
        {
          type: 'receive',
          message: 'hello',
          datetime: 'datetime',
        },
      ],
    },
    {
      lastTextPrev: 'some text...',
      userName: 'username',
      datetime: 'date/time',
      _id: '1234',
      conversation: [
        {
          type: 'send',
          message: 'hello',
          datetime: 'datetime',
        },
        {
          type: 'receive',
          message: 'hello',
          datetime: 'datetime',
        },
      ],
    },
    {
      lastTextPrev: 'some text...',
      userName: 'username',
      datetime: 'date/time',
      _id: '1234',
      conversation: [
        {
          type: 'send',
          message: 'hello',
          datetime: 'datetime',
        },
        {
          type: 'receive',
          message: 'hello',
          datetime: 'datetime',
        },
      ],
    },
    {
      lastTextPrev: 'some text...',
      userName: 'username',
      datetime: 'date/time',
      _id: '1234',
      conversation: [
        {
          type: 'send',
          message: 'hello',
          datetime: 'datetime',
        },
        {
          type: 'receive',
          message: 'hello',
          datetime: 'datetime',
        },
      ],
    },
    {
      lastTextPrev: 'some text...',
      userName: 'username',
      datetime: 'date/time',
      _id: '1234',
      conversation: [
        {
          type: 'send',
          message: 'hello',
          datetime: 'datetime',
        },
        {
          type: 'receive',
          message: 'hello',
          datetime: 'datetime',
        },
      ],
    },
    {
      lastTextPrev: 'some text...',
      userName: 'username',
      datetime: 'date/time',
      _id: '1234',
      conversation: [
        {
          type: 'send',
          message: 'hello',
          datetime: 'datetime',
        },
        {
          type: 'receive',
          message: 'hello',
          datetime: 'datetime',
        },
      ],
    },
    {
      lastTextPrev: 'some text...',
      userName: 'username',
      datetime: 'date/time',
      _id: '1234',
      conversation: [
        {
          type: 'send',
          message: 'hello',
          datetime: 'datetime',
        },
        {
          type: 'receive',
          message: 'hello',
          datetime: 'datetime',
        },
      ],
    },
    {
      lastTextPrev: 'some text...',
      userName: 'username',
      datetime: 'date/time',
      _id: '1234',
      conversation: [
        {
          type: 'send',
          message: 'hello',
          datetime: 'datetime',
        },
        {
          type: 'receive',
          message: 'hello',
          datetime: 'datetime',
        },
      ],
    },
    {
      lastTextPrev: 'some text...',
      userName: 'username',
      datetime: 'date/time',
      _id: '1234',
      conversation: [
        {
          type: 'send',
          message: 'hello',
          datetime: 'datetime',
        },
        {
          type: 'receive',
          message: 'hello',
          datetime: 'datetime',
        },
      ],
    },
  ];
  selectedConvo = this.messages[0];
  conversation = [];
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
    this.selectedConvo.conversation.push({
      datetime: 'datetime',
      message: this.userText,
      type: 'send',
    });
  }
}
