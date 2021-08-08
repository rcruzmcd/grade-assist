import mongoose from 'mongoose';

interface IClasses {
  name: string;
  code: string;
  teacher: string;
  students?: string[];
  assignments?: string[];
}

interface ClassesModelInterface extends mongoose.Model<any> {
  build(attr: IClasses): any;
}

const classesSchema = new mongoose.Schema({
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
});

classesSchema.statics.build = (attr: IClasses) => {
  return new Classes(attr);
};

const Classes = mongoose.model<any, ClassesModelInterface>(
  'Classes',
  classesSchema
);

export { Classes };
