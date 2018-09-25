import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpensesSummary = (props) => {
  const count = props.expenseCount;
  const total = numeral(props.expensesTotal/100).format('$0,0.00');
  return (
    <div className="page-header">
      <div className="content-container">
        { count === 1 ? 
            <h1 className="page-header__title">Viewing <span>{count}</span> expense totalling <span>{total}</span></h1>
            :
            <h1 className="page-header__title">Viewing <span>{count}</span> expenses totalling <span>{total}</span></h1>
        }
        <div className="page-header__actions">
          <Link className="button" to="/create">Add Expense</Link>
        </div>
      </div>
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