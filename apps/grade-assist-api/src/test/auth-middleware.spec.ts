import { expect } from 'chai';
import { Jwt } from 'jsonwebtoken';
import * as sinon from 'sinon';

import * as authMiddleware from '../app/middleware/is-auth';

describe('Auth Middleware', () => {
  it('show throw an error if no authorization header is present', () => {
    const req = {
      get: (headerName) => {
        return null;
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      'Not authenticated.'
    );
  });

  it('should throw an error if the authorization header is only one string', function () {
    const req = {
      get: function (headerName) {
        return 'xyz';
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it('should throw an error if the token cannot be verified', function () {
    const req = {
      get: function (headerName) {
        return 'Bearer xyz';
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });
});
