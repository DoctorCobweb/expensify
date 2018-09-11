import React from 'react';

export default ({ description, amount, createdAt }) => (
  <li>
    <p>{description}</p>
    <p>{amount}</p>
    <p>{createdAt}</p>
  </li>
);