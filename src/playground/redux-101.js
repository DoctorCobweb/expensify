import { createStore } from 'redux';

// action generators: functions that return action objects 
const incrementCount = ({ incrementBy=1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy
});
const decrementCount = ({ decrementBy=1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
});
const resetCount = () => ({
  type: 'RESET',
});
const setCount = ({ count } = {}) => ({
  type: 'SET',
  count: count
});

// reducers
// 1. are pure functions
// 2. never change state or action

const countReducer = (state= { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      };
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy 
      };
    case 'SET':
      return {
        count: action.count
      };
    case 'RESET':
      return {
        count: 0
      };
      default:
        return state;
  }
}

// redux store
const store = createStore(countReducer);

// gets called everytime the store changes
// subscribe to the data, and unsubscribe by calling the return value
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});
// stop 'listening' to changes to the datastore
// unsubscribe();

// Action: an object that gets sent to the store
// DISPATCHING ACTIONS:

store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(incrementCount());
store.dispatch(resetCount());
store.dispatch(decrementCount({ decrementBy: 10 }));
store.dispatch(resetCount());
store.dispatch(setCount({ count: 321 }));
