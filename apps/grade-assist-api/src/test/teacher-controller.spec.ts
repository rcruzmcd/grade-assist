import * as mongoose from 'mongoose';
import * as sinon from 'sinon';
import { expect } from 'chai';

import { User } from '../app/models/users.model';
import { mongodb } from '../app/models/mongoose';

import * as teacherController from '../app/controllers/teachers';

describe('Teachers Controller', () => {
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

  it('should create a new teacher', (done) => {
    const req = {
      body: {},
    };
    const res = {
      status: function () {
        return this;
      },
      json: function () {},
    };

    teacherController
      .createTeacher(req, res, () => {})
      .then((savedTeacher) => {
        expect(savedTeacher).to.have.property('_id');
      });
  });

  after(function (done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
