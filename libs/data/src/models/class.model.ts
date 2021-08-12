import { User } from './teacher.model';

export interface Classes {
  teacher: User;
  students: User[];
  code: string;
  name: string;
  assignments: assignment[];
  _id?: string;
}
export interface assignment {
  name: string;
  grades?: grade[];
  type: string;
  weight?: string;
}
export interface grade {
  grade: number;
  student: string;
  assignment: string;
}
