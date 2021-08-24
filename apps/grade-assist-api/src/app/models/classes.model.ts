import mongoose, { Document } from 'mongoose';

import { IAssignment } from './assignment.model';
export interface IClasses {
  name: string;
  code: string;
  teacher: string;
  students?: string[];
  assignments?: string[];
}

interface ClassesModelInterface extends mongoose.Model<any> {
  build(attr: IClasses): any;
}

const classesSchema = new mongoose.Schema<IClasses>(
  {
    name: {
      type: String,
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    code: {
      type: String,
      required: true,
    },
    students: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
    },
    assignments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Assignment',
    },
  },
  { timestamps: true }
);

classesSchema.statics.build = (attr: IClasses) => {
  return new Classes(attr);
};

const Classes = mongoose.model<any, ClassesModelInterface>(
  'Classes',
  classesSchema
);

export { Classes };
