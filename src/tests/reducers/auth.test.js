import authReducer from '../../reducers/auth';

test('should set default state', () => {
  const state = authReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({});
});

test('should setup action object with uid after login', () => {
  const uid = 'abc123';
  const action = {
    type: 'LOGIN',
    uid
  };
  const state = authReducer({}, action);
  expect(state).toEqual({
    uid
  });
});

test('should setup empty action object after logout', () => {
  const uid = 'abc123';
  const action = {
    type: 'LOGIN',
  };
  const state = authReducer({ uid }, action);
  expect(state).toEqual({});
});