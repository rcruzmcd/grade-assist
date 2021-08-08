export interface Classes {
  teacher: string;
  students: string;
  classCode: string;
  className: string;
  assignments: assignment[];
}
export interface assignment {
  name: string;
  grades: grade[];
  type: string;
  weight: string;
}
export interface grade {
  grade: number;
  student: string;
}
