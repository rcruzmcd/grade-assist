import { Request, Response, NextFunction } from 'express';

import { expect } from 'chai';
import { Jwt } from 'jsonwebtoken';
import * as sinon from 'sinon';

import { isAuth } from '../app/middleware/is-auth';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const next = () => {};

describe('Auth Middleware', () => {
  it('show throw an error if no authorization header is present', () => {
    const req = {
      get: (headerName) => {
        return null;
      },
    };
    expect(
      isAuth.bind(this, req as Request, {} as Response, next as NextFunction)
    ).to.throw('Not authenticated.');
  });

  it('should throw an error if the authorization header is only one string', function () {
    const req = {
      get: function (headerName) {
        return 'xyz';
      },
    };
    expect(
      isAuth.bind(this, req as Request, {} as Response, next as NextFunction)
    ).to.throw();
  });

  it('should throw an error if the token cannot be verified', function () {
    const req = {
      get: function (headerName) {
        return 'Bearer xyz';
      },
    };
    expect(
      isAuth.bind(this, req as Request, {} as Response, next as NextFunction)
    ).to.throw();
  });
});
