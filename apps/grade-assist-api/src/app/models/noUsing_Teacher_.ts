import mongoose from 'mongoose';

interface ITeacher {
  firstName: string;
  lastName: string;
  email: string;
  classes?: string;
}

interface TeacherModelInterface extends mongoose.Model<any> {
  build(attr: ITeacher): any;
}

//extending user so that student, teacher and admin all have same base that can be used for login purposes
const teacherSchema = new mongoose.Schema({
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
  classes: {
    type: String,
    required: false,
  },
});

teacherSchema.statics.build = (attr: ITeacher) => {
  return new Teacher(attr);
};

const Teacher = mongoose.model<any, TeacherModelInterface>(
  'Teacher',
  teacherSchema
);

export { Teacher };
