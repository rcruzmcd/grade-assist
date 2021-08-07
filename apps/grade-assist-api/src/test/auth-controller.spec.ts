import * as mongoose from 'mongoose';
import * as sinon from 'sinon';
import { expect } from 'chai';

import { User } from '../app/models/users.model';
import { mongodb } from '../app/models/mongoose';
import * as AuthController from '../app/controllers/auth';

describe('Auth Controller', () => {
  beforeAll((done) => {
    mongoose
      .connect(mongodb)
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
    User.findOne.throws();

    const req = {
      body: {
        email: 'test@test.com',
        password: 'tester',
      },
    };

    AuthController.login(req, {}, () => {}).then((result) => {
      expect(result).to.be.an('error');
      expect(result).to.have.property('statusCode', 500);
      done();
    });

    User.findOne.restore();
  });

  it('should send a response with a valid user status for an existing user', (done) => {
    const req = { userId: '' };
    const res = {
      statusCode: 500,
      userStatus: null,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.userStatus = data.status;
      },
    };
  });

  afterAll((done) => {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
