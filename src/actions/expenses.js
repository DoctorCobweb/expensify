import uuid from 'uuid';
import database from '../firebase/firebase';

// component calls action generator
// action generator returns object
// component dispatches object
// redux store changes

// async redux actions
//
// components calls action generator
// action generator returns a function (NOT OBJECT)
// component dispatches the function (!)
// function runs (has the ability to dispatch other actions and do whatever it wants)


// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

// async action adding an expense to firebase
export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description='',
      note='',
      amount=0,
      createdAt=0 
    } = expenseData;
    const expense = { description, note, amount, createdAt };

    return database.ref('expenses').push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    });
  };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// Expense removal challenge
// 1. create startRemoveExpense (same call signature as removeExpense)
// 2. test startRemoveExpense with "should remove expenses from firebase"
// 3. use startRemoveExpense in EditExpensePage instead of removeExpense
// 4. adjust EditExpensePage tests
export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch) => {
    return database.ref(`expenses/${id}`)
      .remove()
      .then(() => {
        dispatch(removeExpense({ id }));
      })
      .catch((e) => { console.log(e); })
  };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// expense update challenge
// 1. create startEditExpense (same call sig as editExpense)
// 2. test startEditExpense with 'should edit expenses from firebase'
// 3. use startEditExpense in EditExpensePage instead of editExpense
// 4. adjust EditExpensePage tests
export const startEditExpense = (id, updates) => {
  return (dispatch) => {
    return database.ref(`expenses/${id}`).update(updates)
      .then(() => {
        dispatch(editExpense(id, updates));
      }).catch((e) => {
        console.log(e);
      });
  };
};

// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

// CHALLENGE
// 1. fetch all expense data once
// 2. parse that data into an array
// 3. dispatch SET_EXPENSES
// our async action which actually fetches the data
export const startSetExpenses = () => {
  return (dispatch) => {
    return database.ref('expenses')
      .once('value')
      .then((snapshot) => {
        const expenses = [];

        snapshot.forEach((childSnapshot) => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(setExpenses(expenses));
      });
  };
};





