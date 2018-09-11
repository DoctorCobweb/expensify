import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

const ExpenseList = (props) => (
  <div>
    <h1>expense list</h1>
    <ul>
      {
        props.expenses.map((expense) => <ExpenseListItem key={expense.id} {...expense} />)
      }
    </ul>
  </div>
);

const mapStateToProps = (state) => {
  console.log('state: ', state);
  return {
    expenses: selectExpenses(state.expenses, state.filters)
    // filters: state.filters
  };
};

export default connect(mapStateToProps)(ExpenseList);