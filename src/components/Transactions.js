import React from 'react';
import USD from './USD';
import StringUtil from './StringUtil';

const Transactions = ({ transactions }) => {
  const transactionsList = <table className="table">
    <thead>
      <tr>
        <th>Date</th>
        <th>Symbol</th>
        <th>Type</th>
        <th>Quantity</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map(transaction => (
        <tr>
          <td>{transaction.date}</td>
          <td>
            <StringUtil fn="upperCase" string={transaction.ticker} />
          </td>
          <td>
            <StringUtil fn="capitalize" string={transaction.type} />
          </td>
          <td>{transaction.quantity}</td>
          <td>
            <USD amount={transaction.amount} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>;

  return (
    <div className="Transactions">
      <h1>Transactions</h1>
      {transactions.length ?
        transactionsList :
        <p className="text-danger">No transactions</p>}
    </div>
  );
};

export default Transactions;
