import * as fromActions from '../actions';
import * as fromReducer from './student.reducers';

const { initialState } = fromReducer;
describe('StudentReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.reducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('loadAllTeachersSuccess', () => {
    it('should save studentsList from payload', () => {
      const studentList = [
        {
          firstName: '',
          lastName: '',
          email: '',
        },
      ];

      const localState: fromReducer.StudentState = {
        ...initialState,
      };

      const payload = {
        studentList: studentList,
      };

      const expectedState: fromReducer.StudentState = {
        ...initialState,
        studentsList: studentList,
      };

      const action = fromActions.loadAllStudentSuccess({ payload });
      const state = fromReducer.reducer(localState, action);

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(localState);
    });
  });

  describe('deleteTeacherSuccess action', () => {
    it('should remove delete class from state', () => {
      const studentList = [
        {
          firstName: '',
          lastName: '',
          email: '',
          _id: '123454',
        },
        {
          firstName: '',
          lastName: '',
          email: '',
          _id: '678533',
        },
      ];
      const payload = {
        id: '678533',
      };

      const localState: fromReducer.StudentState = {
        ...initialState,
        studentsList: studentList,
      };

      const modifiedstudentList = [
        {
          firstName: '',
          lastName: '',
          email: '',
          _id: '123454',
        },
      ];

      const expectedState: fromReducer.StudentState = {
        ...initialState,
        studentsList: modifiedstudentList,
      };

      const action = fromActions.deleteStudentSuccess({ payload });
      const state = fromReducer.reducer(localState, action);

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(localState);
    });
  });
});
