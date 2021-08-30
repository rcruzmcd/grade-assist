import * as fromActions from '../actions';
import * as fromReducer from './teachers.reducers';

const { initialState } = fromReducer;
describe('TeachersReducer', () => {
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
    it('should save teachersList from payload', () => {
      const teacherList = [
        {
          firstName: '',
          lastName: '',
          email: '',
        },
      ];

      const localState: fromReducer.TeachersState = {
        ...initialState,
      };

      const payload = {
        teachersList: teacherList,
      };

      const expectedState: fromReducer.TeachersState = {
        ...initialState,
        teachersList: teacherList,
      };

      const action = fromActions.loadAllTeachersSuccess({ payload });
      const state = fromReducer.reducer(localState, action);

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(localState);
    });
  });

  describe('deleteTeacherSuccess action', () => {
    it('should remove delete class from state', () => {
      const teacherList = [
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

      const localState: fromReducer.TeachersState = {
        ...initialState,
        teachersList: teacherList,
      };

      const modifiedTeacherList = [
        {
          firstName: '',
          lastName: '',
          email: '',
          _id: '123454',
        },
      ];

      const expectedState: fromReducer.TeachersState = {
        ...initialState,
        teachersList: modifiedTeacherList,
      };

      const action = fromActions.deleteTeachersSuccess({ payload });
      const state = fromReducer.reducer(localState, action);

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(localState);
    });
  });
});
