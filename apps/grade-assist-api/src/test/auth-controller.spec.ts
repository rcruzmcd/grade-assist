import { Request, Response, NextFunction } from 'express';

import { connect, disconnect } from 'mongoose';
import * as sinon from 'sinon';
import { expect } from 'chai';

import { User } from '../app/models/users.model';
import { mongodb } from '../app/models/mongoose';
import * as AuthController from '../app/controllers/auth/auth';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const next = () => {};

describe('Auth Controller', () => {
  beforeAll((done) => {
    connect(mongodb)
      .then((result) => {
        const user = new User({
          firstName: 'test',
          lastName: 'test',
          email: 'test@test.com',
          password: 'tester',
          type: 'tester',
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });

  //   beforeEach(() => {});
  //   afterEach(() => {});

  it('should throw an error with code 500 if accessing the database fails', (done) => {
    sinon.stub(User, 'findOne');
    // User.findOne.throws();

    const req = {
      body: {
        email: 'test@test.com',
        password: 'tester',
      },
    };

    AuthController.login(
      req as Request,
      {} as Response,
      next as NextFunction
    ).then((result) => {
      expect(result).to.be.an('error');
      expect(result).to.have.property('statusCode', 500);
      done();
    });

    // User.findOne.restore();
  });

  it('should send a response with a valid user status for an existing user', (done) => {
    const req = {
      body: {
        email: 'test@test.com',
        password: 'tester',
      },
    };
    const res = {
      statusCode: 200,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.userStatus = data.status;
      },
    };

    AuthController.login(
      req as Request,
      res as Response,
      next as NextFunction
    ).then(() => {
      expect(res.statusCode).to.be.equal(200);
      done();
    });
  });

  afterAll((done) => {
    User.deleteMany({})
      .then(() => {
        return disconnect();
      })
      .then(() => {
        done();
      });
  });
});
