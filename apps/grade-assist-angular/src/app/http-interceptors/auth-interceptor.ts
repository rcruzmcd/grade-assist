import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { first, flatMap, mergeMap } from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromStore.State>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select(fromStore.selectAuthFeatureToken).pipe(
      first(),
      mergeMap((token) => {
        const authReq = token
          ? req.clone({ setHeaders: { Authorization: token } })
          : req;
        return next.handle(authReq);
      })
    );
  }
}
