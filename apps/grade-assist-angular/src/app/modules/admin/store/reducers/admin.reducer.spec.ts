import * as fromActions from '../actions';
import * as fromReducer from './admin.reducers';

const { initialState } = fromReducer;
describe('AdminReducer', () => {
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
    it('should save adminsList from payload', () => {
      const adminList = [
        {
          firstName: '',
          lastName: '',
          email: '',
        },
      ];

      const localState: fromReducer.AdminState = {
        ...initialState,
      };

      const payload = {
        adminList: adminList,
      };

      const expectedState: fromReducer.AdminState = {
        ...initialState,
        adminsList: adminList,
        loading: false,
        loaded: true,
      };

      const action = fromActions.loadAllAdminSuccess({ payload });
      const state = fromReducer.reducer(localState, action);

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(localState);
    });
  });

  describe('loadAllTeachersFailure', () => {
    it('should save adminsList from payload', () => {
      const adminList = [
        {
          firstName: '',
          lastName: '',
          email: '',
        },
      ];

      const localState: fromReducer.AdminState = {
        ...initialState,
      };

      const payload = {};

      const expectedState: fromReducer.AdminState = {
        ...initialState,
        adminsList: [],
        loading: false,
      };

      const action = fromActions.loadAllAdminFailure({ payload });
      const state = fromReducer.reducer(localState, action);

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(localState);
    });
  });

  describe('loadAllTeachers', () => {
    it('should save adminsList from payload', () => {
      const localState: fromReducer.AdminState = {
        ...initialState,
      };

      const payload = {};

      const expectedState: fromReducer.AdminState = {
        ...initialState,
        loading: true,
      };

      const action = fromActions.loadAllAdmin({ payload });
      const state = fromReducer.reducer(localState, action);

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(localState);
    });
  });

  describe('deleteTeacherSuccess action', () => {
    it('should remove delete class from state', () => {
      const adminList = [
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

      const localState: fromReducer.AdminState = {
        ...initialState,
        adminsList: adminList,
      };

      const modifiedadminList = [
        {
          firstName: '',
          lastName: '',
          email: '',
          _id: '123454',
        },
      ];

      const expectedState: fromReducer.AdminState = {
        ...initialState,
        adminsList: modifiedadminList,
      };

      const action = fromActions.deleteAdminSuccess({ payload });
      const state = fromReducer.reducer(localState, action);

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(localState);
    });
  });
});
