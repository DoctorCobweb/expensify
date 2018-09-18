import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should correclty display for one selected expense', () => {
  const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesTotal={122}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should correclty display for multiple-selected expenses', () => {
  const wrapper = shallow(<ExpensesSummary expensesCount={23} expensesTotal={1095100}/>);
  expect(wrapper).toMatchSnapshot();
});