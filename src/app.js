import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
// import './playground/promises';

const store = configureStore();

store.subscribe(() => {
  // const state = store.getState();
  // const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  // console.log(visibleExpenses);
});

// dummy data
// store.dispatch(addExpense({ description:'water bill', amount: 4500}));
// store.dispatch(addExpense({ description:'gas bill', createdAt: 1000 }));
// store.dispatch(addExpense({ description:'rent', amount: 109500}));

// the provider will provide access to the store
// for every component in our app
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;

// make sure app is only rendered a single time
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx , document.getElementById('app'));
    hasRendered = true;
  }
};

// make loading screen whilst app fetches data from firebase
ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    // console.log('uid', user.uid);
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});