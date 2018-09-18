import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpensesSummary = (props) => {
  const count = props.expenseCount;
  const total = numeral(props.expensesTotal/100).format('$0,0.00');
  return (
    <div>
      { count === 1 ? 
          <h1>Viewing {count} expense totalling {total}</h1>
          :
          <h1>Viewing {count} expenses totalling {total}</h1>
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  const selectedExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expenseCount: selectedExpenses.length,
    expensesTotal: selectExpensesTotal(selectedExpenses)
  };
};


// get access to the state via props by calling 'connect' and passing in mapStateToProps
export default connect(mapStateToProps)(ExpensesSummary);