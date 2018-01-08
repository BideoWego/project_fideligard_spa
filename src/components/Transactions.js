import React from 'react';
import {
  USD,
  StringUtil
} from '.';

const Transactions = ({ transactions }) => {
  const transactionsList = (
    <div className="table-responsive">
      <table className="table">
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
            <tr key={transaction.id}>
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
      </table>
    </div>
  );

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
