import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';

import { User } from '@grade-assist/data';

@Component({
  selector: 'grade-assist-conversation-recipient',
  templateUrl: './conversation-recipient.component.html',
  styleUrls: ['./conversation-recipient.component.scss'],
})
export class ConversationRecipientComponent {
  filteredTo?: Observable<User[]>; // loop on mat-options
  isEditingTo = true;
  removable = true;
  selectable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  toCtrl = new FormControl(); // input ctrl

  @Input()
  allTo: User[] = [];

  @Input()
  to: User[] = []; // iterates on mat-chip
  @Output() toChange = new EventEmitter<any>();

  @ViewChild('toInput') toInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredTo = this.toCtrl.valueChanges.pipe(
      startWith(null),
      map((to: User | null) => (to ? this._filter(to) : this.allTo.slice()))
    );
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.to.push(event.option.value);
    this.toInput.nativeElement.value = '';
    this.toCtrl.setValue(null);
    this.toChange.emit(this.to);
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

  onEditClicked() {
    this.isEditingTo = !this.isEditingTo;
    // this.toCtrl.disable();
  }

  private _filter(value: User): User[] {
    const filterValue = value;

    return this.allTo.filter((to) => to._id === filterValue._id);
  }
}
