import mongoose from 'mongoose';

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  type: string;
  classes?: string;
}

interface UserModelInterface extends mongoose.Model<any> {
  build(attr: IUser): any;
}

// interface userType {}
export enum UserType {
  admin,
  teacher,
  student,
}

//extending user so that student, User and admin all have same base that can be used for login purposes
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: UserType,
    required: true,
  },
  classes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Classes',
    required: false,
  },
});

userSchema.statics.build = (attr: IUser) => {
  return new User(attr);
};

const User = mongoose.model<any, UserModelInterface>('User', userSchema);

export { User };
