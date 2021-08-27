import { Request, Response, NextFunction } from 'express';

import * as mongoose from 'mongoose';
import * as sinon from 'sinon';
import { expect } from 'chai';

import { User } from '../app/models/users.model';
import { mongodb } from '../app/models/mongoose';

import * as teacherController from '../app/controllers/teacher/teachers';
// eslint-disable-next-line @typescript-eslint/no-empty-function
const next = () => {};

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
      body: {
        firstName: 'teacher',
        lastName: 'test',
        email: 'teacher@test.com',
        password: 'tester',
        type: 'teacher',
      },
    };
    const res = {
      statusCode: 200,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.teacher = data;
      },
    };

    teacherController
      .createTeacher(req as Request, res as Response, next as NextFunction)
      .then((savedTeacher) => {
        expect(savedTeacher).to.have.property('_id');
        done();
      });
  });

  // teacherController.getTeachers success and failure
  // teacherController.deleteTeacher success and failure
  // teacherController.updateTeacher success and failure

  afterAll(function (done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
