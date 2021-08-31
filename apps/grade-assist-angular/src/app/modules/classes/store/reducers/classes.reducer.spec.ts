import * as fromActions from '../actions';
import * as fromReducer from './classes.reducers';

const { initialState } = fromReducer;

const classList = [
  {
    _id: '123324',
    name: 'test',
    teacher: {
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com',
    },
    code: '',
    students: [],
    assignments: [],
  },
  {
    _id: '123452',
    name: 'test',
    teacher: {
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com',
    },
    code: '',
    students: [],
    assignments: [],
  },
];

const studentList = [
  {
    _id: '73745',
    firstName: 'test',
    lastName: 'test',
    email: 'test@test.com',
  },
  {
    _id: '324123',
    firstName: 'test',
    lastName: 'test',
    email: 'test@test.com',
  },
  {
    _id: '756124',
    firstName: 'test',
    lastName: 'test',
    email: 'test@test.com',
  },
  {
    _id: '95673',
    firstName: 'test',
    lastName: 'test',
    email: 'test@test.com',
  },
];

describe('ClassesReducer', () => {
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

  describe('loadAllClassesSuccess action', () => {
    it('should add returned classes to', () => {
      const rsp = {
        classes: classList,
      };

      const expectedState: fromReducer.ClassesState = {
        classesList: classList,
        loaded: true,
        loading: false,
        selectedClass: {},
        teacherList: [],
        selectedAssign: { name: '', type: '', grades: [] },
      };

      const action = fromActions.loadAllClassesSuccess({ payload: rsp });
      const state = fromReducer.reducer(initialState, action);

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(initialState);
    });
  });

  describe('deleteClassesSuccess action', () => {
    it('should remove delete class from state', () => {
      const rsp = {
        id: '123452',
      };

      const localState = {
        ...initialState,
        classesList: classList,
      };

      const modifiedClassList = [
        {
          _id: '123324',
          name: 'test',
          teacher: {
            firstName: 'test',
            lastName: 'test',
            email: 'test@test.com',
          },
          code: '',
          students: [],
          assignments: [],
        },
      ];

      const expectedState: fromReducer.ClassesState = {
        classesList: modifiedClassList,
        loaded: true,
        loading: false,
        selectedClass: {},
        teacherList: [],
        selectedAssign: { name: '', type: '', grades: [] },
      };

      const action = fromActions.deleteClassesSuccess({ payload: rsp });
      const state = fromReducer.reducer(localState, action);

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(localState);
    });
  });

  describe('selectClass action', () => {
    it('should store the class user selected', () => {
      const payload = classList[0];

      const localState = {
        ...initialState,
        classesList: classList,
      };

      const expectedState: fromReducer.ClassesState = {
        classesList: classList,
        loaded: false,
        loading: false,
        selectedClass: {
          _id: '123324',
          name: 'test',
          teacher: {
            firstName: 'test',
            lastName: 'test',
            email: 'test@test.com',
          },
          code: '',
          students: [],
          assignments: [],
        },
        teacherList: [],
        selectedAssign: { name: '', type: '', grades: [] },
      };

      const action = fromActions.selectClass({ payload });
      const state = fromReducer.reducer(localState, action);

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(localState);
    });
  });

  describe('getStudetnsNotAssignedSuccess action', () => {
    it('should filter out the students already in the class from studentList', () => {
      const payload = {
        studentList,
      };

      const localState = {
        ...initialState,
        classesList: classList,
        selectedClass: {
          _id: '123324',
          name: 'test',
          teacher: {
            firstName: 'test',
            lastName: 'test',
            email: 'test@test.com',
          },
          code: '',
          students: [
            {
              _id: '756124',
              firstName: 'test',
              lastName: 'test',
              email: 'test@test.com',
            },
            {
              _id: '95673',
              firstName: 'test',
              lastName: 'test',
              email: 'test@test.com',
            },
          ],
          assignments: [],
        },
      };

      const expectedState: fromReducer.ClassesState = {
        classesList: classList,
        loaded: false,
        loading: false,
        selectedClass: {
          _id: '123324',
          name: 'test',
          teacher: {
            firstName: 'test',
            lastName: 'test',
            email: 'test@test.com',
          },
          code: '',
          students: [
            {
              _id: '756124',
              firstName: 'test',
              lastName: 'test',
              email: 'test@test.com',
            },
            {
              _id: '95673',
              firstName: 'test',
              lastName: 'test',
              email: 'test@test.com',
            },
          ],
          assignments: [],
        },
        studentsNotInSelected: [
          {
            _id: '73745',
            firstName: 'test',
            lastName: 'test',
            email: 'test@test.com',
          },
          {
            _id: '324123',
            firstName: 'test',
            lastName: 'test',
            email: 'test@test.com',
          },
        ],
        teacherList: [],
        selectedAssign: { name: '', type: '', grades: [] },
      };

      const action = fromActions.getStudetnsNotAssignedSuccess({ payload });
      const state = fromReducer.reducer(localState, action);

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(localState);
    });
  });

  describe('addStudentsSuccess', () => {
    it('should replace selected class with the rsp with complete list of student', () => {
      const localState = {
        ...initialState,
        classesList: classList,
        selectedClass: classList[0],
      };

      const payload = {
        class: classList[0],
      };

      const expectedState: fromReducer.ClassesState = {
        ...initialState,
        classesList: classList,
        selectedClass: classList[0],
      };

      const action = fromActions.addStudentsSuccess({ payload });
      const state = fromReducer.reducer(localState, action);

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(localState);
    });
  });

  describe('deleteStudentSuccess', () => {
    it('should replace selected class with the rsp with complete list of student', () => {
      const localState = {
        ...initialState,
        classesList: classList,
        selectedClass: classList[0],
      };

      const payload = {
        class: classList[0],
      };

      const expectedState: fromReducer.ClassesState = {
        ...initialState,
        classesList: classList,
        selectedClass: classList[0],
      };

      const action = fromActions.deleteStudentsSuccess({ payload });
      const state = fromReducer.reducer(localState, action);

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(localState);
    });
  });

  describe('clearClassesSuccess', () => {
    it('should replace selected class with the rsp with complete list of student', () => {
      const localState = {
        ...initialState,
        classesList: classList,
        selectedClass: classList[0],
      };

      const payload = {
        class: classList[0],
      };

      const expectedState: fromReducer.ClassesState = {
        ...initialState,
        classesList: classList,
        selectedClass: classList[0],
      };

      const action = fromActions.clearClassesSuccess({ payload });
      const state = fromReducer.reducer(localState, action);

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(localState);
    });
  });

  describe('loadTeachersSuccess', () => {
    it('should save teachers list to the state', () => {
      const teacherList = studentList;
      const localState = {
        ...initialState,
      };

      const payload = {
        teachersList: teacherList,
      };

      const expectedState: fromReducer.ClassesState = {
        ...initialState,
        teacherList,
      };

      const action = fromActions.loadTeachersSuccess({ payload });
      const state = fromReducer.reducer(localState, action);

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(localState);
    });
  });

  describe('addAssignSuccess', () => {
    it('should save new assignment', () => {
      const assign = {
        name: 'test',
        grades: [],
        type: 'test',
        _id: '1234',
      };
      const selectedClass = classList[0];
      //   selectedClass.assignments.push()
      const localState: fromReducer.ClassesState = {
        ...initialState,
        classesList: classList,
        selectedClass: selectedClass,
      };

      const payload = {
        ...assign,
      };

      const expectedState: fromReducer.ClassesState = {
        ...localState,
        selectedClass: {
          ...localState.selectedClass,
          assignments: [...localState.selectedClass.assignments, assign],
        },
      };

      const action = fromActions.addAssignSuccess({ payload });
      const state = fromReducer.reducer(localState, action);

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(localState);
    });
  });

  describe('getAssignGradesSuccess', () => {
    it('should save grades of selected assignment in state', () => {
      const assign = {
        name: 'test',
        grades: [],
        type: 'test',
        _id: '1234',
      };

      const localState: fromReducer.ClassesState = {
        ...initialState,
        classesList: classList,
        selectedClass: classList[0],
        selectedAssign: assign,
      };

      const payload = {
        grades: [{ grade: 99, student: studentList[0], assignment: 'test' }],
      };

      const expectedAssignment = {
        ...assign,
        grades: [{ grade: 99, student: studentList[0], assignment: 'test' }],
      };

      const expectedState: fromReducer.ClassesState = {
        ...initialState,
        classesList: classList,
        selectedClass: classList[0],
        selectedAssign: expectedAssignment,
      };

      const action = fromActions.getAssignGradesSuccess({ payload });
      const state = fromReducer.reducer(localState, action);

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(localState);
    });
  });
  describe('addGradeSuccess', () => {
    it('should save grade of selected assignment', () => {
      const localState = {
        ...initialState,
      };

      const payload = {};

      const expectedState: fromReducer.ClassesState = {
        ...initialState,
      };

      const action = fromActions.addGradeSuccess({ payload });
      const state = fromReducer.reducer(localState, action);

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(localState);
    });
  });
  describe('selectAssignment', () => {
    it('should save assignment selected ins state', () => {
      const assign = {
        name: 'test',
        grades: [],
        type: 'test',
        _id: '1234',
      };

      const localState = {
        ...initialState,
      };

      const payload = {
        ...assign,
      };

      const expectedState: fromReducer.ClassesState = {
        ...initialState,
        selectedAssign: assign,
      };

      const action = fromActions.selectAssignment({ payload });
      const state = fromReducer.reducer(localState, action);

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(localState);
    });
  });
});
