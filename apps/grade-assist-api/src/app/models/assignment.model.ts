import mongoose from 'mongoose';

interface assignment {
  name: string;
  grades?: grade[];
  type: string;
  weight?: string;
  class: string;
}
interface grade {
  grade: number;
  student: string;
  assignment: string;
}

interface AssignmentModelInterface extends mongoose.Model<any> {
  build(attr: assignment): any;
}

interface GradeModelInterface extends mongoose.Model<any> {
  build(attr: grade): any;
}

const assignmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: false,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classes',
  },
  grades: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Grade',
  },
});

const gradeSchema = new mongoose.Schema({
  grade: {
    type: Number,
    required: true,
  },
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

assignmentSchema.statics.build = (attr: assignment) => {
  return new Assignment(attr);
};

gradeSchema.statics.build = (attr: grade) => {
  return new Grade(attr);
};

const Assignment = mongoose.model<any, AssignmentModelInterface>(
  'Assignment',
  assignmentSchema
);

const Grade = mongoose.model<any, GradeModelInterface>('Grade', gradeSchema);

export { Assignment, Grade };
