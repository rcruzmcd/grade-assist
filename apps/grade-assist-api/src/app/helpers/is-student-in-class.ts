export const isStudentInClass = (_class: any, studentId: any) => {
  for (const classStu of _class.students) {
    console.log(classStu);
    if (classStu._id == studentId) return true;
  }
  return false;
};
