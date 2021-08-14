import { Request, Response, NextFunction } from 'express';

export * from './add-student-class.controller';
export * from './clear-class.controller';
export * from './create-class.controller';
export * from './delete-class.controller';
export * from './delete-student-class.controller';
export * from './get-classes.controller';
export * from './update-class.controller';

export const addAssignmentToClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next();
};
