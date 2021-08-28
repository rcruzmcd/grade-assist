import { selectAuthFeatureToken } from '.';
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
  getUserSuccess,
} from '../actions';
import * as fromReducer from './auth.reducer';
describe('AuthReducer', () => {
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

  describe('login action', () => {
    it('should return received state', () => {
      const { initialState } = fromReducer;

      const action = login({});
      const state = fromReducer.reducer(initialState, action);

      expect(state).toEqual(initialState);
      expect(state).not.toBe(initialState);
    });
  });

  describe('loginFailure action', () => {
    it('should return received state', () => {
      const { initialState } = fromReducer;

      const action = loginFailure({});
      const state = fromReducer.reducer(initialState, action);

      expect(state).toEqual(initialState);
      expect(state).not.toBe(initialState);
    });
  });

  describe('loginSuccess action', () => {
    it('should add user info to the state', () => {
      const { initialState } = fromReducer;

      const rsp = {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJJZCI6IjYxMmE1YzM5ZmM0MzE5NWQyN2U2MzZlOCIsInVzZXJUeXBlIjoiYWRtaW4iLCJpYXQiOjE2MzAxNjYwODQsImV4cCI6MTYzMDE2OTY4NH0.KLuZiWecosRxzqXm_3TXZqZhcRyf1bL6jCHTQIk2nN8',
        userId: '123',
        userType: 'admin',
        userEmail: 'admin@admin.com',
      };

      const expectedState: fromReducer.AuthState = {
        jwt: rsp.token,
        userId: rsp.userId,
        userType: rsp.userType,
        userEmail: rsp.userEmail,
        loaded: true,
        loading: false,
      };
      const action = loginSuccess({ payload: rsp });
      const state = fromReducer.reducer(initialState, action);

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(initialState);
    });
  });

  describe('logoutFailure action', () => {
    it('should return received state', () => {
      const { initialState } = fromReducer;

      const action = logoutFailure({});
      const state = fromReducer.reducer(initialState, action);

      expect(state).toEqual(initialState);
      expect(state).not.toBe(initialState);
    });
  });

  describe('logoutSuccess action', () => {
    it('should return received state', () => {
      const { initialState } = fromReducer;

      const action = logoutSuccess({});
      const state = fromReducer.reducer(initialState, action);

      expect(state).toEqual(initialState);
      expect(state).not.toBe(initialState);
    });
  });

  describe('logout action', () => {
    it('should clear out user information', () => {
      const currentState: fromReducer.AuthState = {
        jwt: 'myjwtsl.strl.sting',
        loaded: true,
        loading: false,
        userType: 'admin',
        userEmail: 'admin@emial.com',
      };

      const { initialState } = fromReducer;

      const action = logout({});
      const state = fromReducer.reducer(currentState, action);

      expect(state).toEqual(initialState);
      expect(state).not.toBe(initialState);
    });
  });

  describe('getUserSuccess action', () => {
    it('should add user info from server', () => {
      const currentState: fromReducer.AuthState = {
        jwt: 'myjwtsl.strl.sting',
        loaded: true,
        loading: false,
        userType: 'admin',
        userEmail: 'admin@emial.com',
      };

      const expectedState: fromReducer.AuthState = {
        ...currentState,
        user: {
          firstName: 'test',
          lastName: 'test',
          email: 'email@test.com',
        },
      };

      const action = getUserSuccess({
        payload: {
          user: {
            firstName: 'test',
            lastName: 'test',
            email: 'email@test.com',
          },
        },
      });
      const state = fromReducer.reducer(currentState, action);

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(currentState);
    });
  });
});

describe('AuthSelector', () => {
  const { initialState } = fromReducer;
  const currentState = {
    ...initialState,
    jwt: 'my.jwt.string',
  };

  it('should select the jwt', () => {
    const result = selectAuthFeatureToken.projector(currentState);
    expect(result).toEqual('my.jwt.string');
  });
});
