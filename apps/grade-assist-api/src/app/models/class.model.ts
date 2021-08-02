import mongoose from 'mongoose';

interface IClass {
  name: string;
  code: string;
  teacher: string;
  students: string[];
}

interface ClassModelInterface extends mongoose.Model<any> {
  build(attr: IClass): any;
}

const classSchema = new mongoose.Schema({
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

classSchema.statics.build = (attr: IClass) => {
  return new Class(attr);
};

const Class = mongoose.model<any, ClassModelInterface>('Class', classSchema);

export { Class };
