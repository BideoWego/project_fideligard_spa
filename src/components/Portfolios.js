import React from 'react';
import { USD } from '.';

const Portfolios = ({ bank, positions=[] }) => {
  const positionsList = (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Cost Basis</th>
            <th>Current Value</th>
            <th>Profit/Loss</th>
            <th>1d</th>
            <th>7d</th>
            <th>30d</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {positions.map(position => (
            <tr key={position.id}>
              <td>
                {position.ticker.toUpperCase()}
              </td>
              <td>{position.quantity}</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="Portfolios">
      <h1>Portfolios</h1>
      <h2>
        Bank: {' '}
        <USD amount={bank} />
      </h2>
      {positions.length ?
        positionsList :
        <p className="text-danger">No positions</p>}
    </div>
  );
};

export default Portfolios;
