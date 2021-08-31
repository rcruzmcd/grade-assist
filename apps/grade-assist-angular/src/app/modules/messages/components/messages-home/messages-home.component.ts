import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';

@Component({
  selector: 'grade-assist-messages-home',
  templateUrl: './messages-home.component.html',
  styleUrls: ['./messages-home.component.scss'],
})
export class MessagesHomeComponent {
  // constructor(private store: Store<fromStore.State>) {}
  // ngOnInit(): void {
  //   this.store.subscribe((state) => {
  //     console.log(state);
  //   });
  // }
}
