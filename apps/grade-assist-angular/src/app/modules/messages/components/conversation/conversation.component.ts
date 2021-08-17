import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IConversation, User } from '@grade-assist/data';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import * as fromStore from '../../store';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'grade-assist-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {
  selectedConvo?: IConversation;
  userText = '';
  isEditingTo = true;
  loggedInUser: any;

  // header
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  toCtrl = new FormControl(); // input ctrl
  to: User[] = []; // iterates on mat-chip
  filteredTo?: Observable<User[]>; // loop on mat-options
  allTo: User[] = [];
  @ViewChild('toInput') toInput!: ElementRef<HTMLInputElement>;

  constructor(private store: Store<fromStore.State>) {
    this.filteredTo = this.toCtrl.valueChanges.pipe(
      startWith(null),
      map((to: User | null) => (to ? this._filter(to) : this.allTo.slice()))
    );
  }
  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.loggedInUser = {
        userId: '611586797489f232af0ec385',
      };

      if (state.messages.userList) this.allTo = state.messages.userList;

      if (
        state.messages.selectedConversation &&
        this.selectedConvo?._id !== state.messages.selectedConversation?._id
      ) {
        // reset to array as empty for new conversation selected
        this.isEditingTo = false;
        this.to = [];
        this.selectedConvo = state.messages.selectedConversation;

        // filter out logged in user from participants
        const _to: any = this.selectedConvo.participants.filter(
          (person: any) => person._id != this.loggedInUser.userId
        );

        // copy of partipants
        const __to: any = [..._to];

        // push participants to array
        for (const person of __to) {
          this.to.push(person);
        }
      }
    });
  }

  onSend() {
    const receivers = this.to.map((to) => to._id);
    const message = {
      sender: this.loggedInUser?.userId,
      receivers: receivers,
      messageText: this.userText,
      convoId: this.selectedConvo?._id,
    };
    this.store.dispatch({
      type: fromStore.MessagesActions.SEND_MESSAGES,
      payload: message,
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    console.log('add', event);
    // Add our to
    // if (value) {
    //   this.tos.push(value);
    // }

    // Clear the input value
    event.chipInput?.clear();

    this.toCtrl.setValue(null);
  }

  remove(to: User): void {
    console.log('remove', to);
    const index = this.to.indexOf(to);
    if (index >= 0) {
      this.to.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.to.push(event.option.value);
    this.toInput.nativeElement.value = '';
    this.toCtrl.setValue(null);
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

  onEditClicked() {
    this.isEditingTo = !this.isEditingTo;
    // this.toCtrl.disable();
  }

  private _filter(value: User): User[] {
    const filterValue = value;

    return this.allTo.filter((to) => to._id === filterValue._id);
  }
}
