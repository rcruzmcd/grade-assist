import { IConversation } from '@grade-assist/data';
import * as fromActions from '../actions';
import * as fromReducer from './messages.reducers';

const { initialState } = fromReducer;
describe('MessagesReducer', () => {
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

  describe('getMessagesSuccess', () => {
    it('should save conversation from payload', () => {
      const convoStub: IConversation[] = [
        {
          messages: [],
          participants: [],
          _id: '123',
        },
      ];

      const localState: fromReducer.MessagesState = {
        ...initialState,
      };

      const payload = {
        conversations: convoStub,
      };

      const expectedState: fromReducer.MessagesState = {
        ...initialState,
        conversations: convoStub,
        convos: {
          '123': convoStub[0],
        },
      };

      const action = fromActions.getMessagesSuccess({ payload });
      const state = fromReducer.reducer(localState, action);

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(localState);
    });
  });

  describe('selectConversation', () => {
    it('should save selected conversation from payload', () => {
      const convoStub = [
        {
          messages: [],
          participants: [],
        },
      ];

      const selectedStub = {
        messages: [],
        participants: ['1234', '4566'],
      };

      const localState: fromReducer.MessagesState = {
        ...initialState,
        conversations: convoStub,
      };

      const payload = {
        ...selectedStub,
      };

      const expectedState: fromReducer.MessagesState = {
        ...initialState,
        conversations: convoStub,
        selectedConversation: selectedStub,
      };

      const action = fromActions.selectConversation({ payload });
      const state = fromReducer.reducer(localState, action);

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(localState);
    });
  });

  describe('sendMessagesSuccess', () => {
    it('should save conversation from payload', () => {
      const convoStub = [
        {
          messages: [],
          participants: ['1234', '4566'],
          _id: '123',
        },
      ];

      const selectedStub = {
        messages: [],
        participants: ['1234', '4566'],
        _id: '123',
      };

      const localState: fromReducer.MessagesState = {
        ...initialState,
        conversations: convoStub,
      };

      const payload = {
        convo: selectedStub,
      };

      const expectedState: fromReducer.MessagesState = {
        ...initialState,
        conversations: [...convoStub, selectedStub],
        selectedConversation: selectedStub,
        convos: {
          '123': selectedStub,
        },
      };

      const action = fromActions.sendMessagesSuccess({ payload });
      const state = fromReducer.reducer(localState, action);

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(localState);
    });
  });

  describe('getUsersSuccess', () => {
    it('should save userlist  from payload', () => {
      const userList = [
        {
          firstName: '',
          lastName: '',
          email: '',
        },
      ];

      const localState: fromReducer.MessagesState = {
        ...initialState,
      };

      const payload = {
        userList: userList,
      };

      const expectedState: fromReducer.MessagesState = {
        ...initialState,
        userList: userList,
      };

      const action = fromActions.getUsersSuccess({ payload });
      const state = fromReducer.reducer(localState, action);

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(localState);
    });
  });
});
