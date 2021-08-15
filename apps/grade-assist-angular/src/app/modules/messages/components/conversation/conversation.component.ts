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
  loggedInUser: any;

  // header
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  toCtrl = new FormControl();
  to: string[] = [];
  filteredTo?: Observable<string[]>;
  allTo: string[] = ['611586657489f232af0ec37f', 'twouser'];
  @ViewChild('toInput') toInput!: ElementRef<HTMLInputElement>;

  constructor(private store: Store<fromStore.State>) {
    this.filteredTo = this.toCtrl.valueChanges.pipe(
      startWith(null),
      map((to: string | null) => (to ? this._filter(to) : this.allTo.slice()))
    );
  }
  ngOnInit(): void {
    this.store.subscribe((state) => {
      console.log(state);
      this.loggedInUser = {
        userId: '611586797489f232af0ec385',
      };
      this.selectedConvo = state.messages.selectedConversation;
      if (this.selectedConvo) {
        const _to: any = this.selectedConvo.participants.filter(
          (person: any) => person._id == this.loggedInUser.userId
        );
        const __to: any = [..._to];
        for (const person of __to) {
          this.to.push(person._id);
        }
      }
    });
  }

  onSend() {
    const message = {
      sender: this.loggedInUser?.userId,
      receivers: this.to,
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

    // Add our to
    // if (value) {
    //   this.tos.push(value);
    // }

    // Clear the input value
    event.chipInput?.clear();

    this.toCtrl.setValue(null);
  }

  remove(to: string): void {
    const index = this.to.indexOf(to);
    if (index >= 0) {
      this.to.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.to.push(event.option.viewValue);
    this.toInput.nativeElement.value = '';
    this.toCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTo.filter((to) => to.toLowerCase().includes(filterValue));
  }
}
