import { provideMockActions } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';

let actions$ = new Observable<Action>();

TestBed.configureTestingModule({
  providers: [provideMockActions(() => actions$)],
});
