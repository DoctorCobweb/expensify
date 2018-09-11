import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseListItem = ({ description, amount, createdAt, id }) => {
  // console.log('props', dispatch);
  return (
    <li>
      <Link to={`/edit/${id}`}>
        <h3>{description}</h3>
      </Link>
      <p>{amount}</p>
      <p>{createdAt}</p>
    </li>
  );
};
export default ExpenseListItem;