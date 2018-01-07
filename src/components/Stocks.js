import React from 'react';
import USD from './USD';

const Stocks = ({ stocks, tickers, filter, onChange }) => {
  const stocksList = Object.keys(tickers).length ? (
    <table className="table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Price</th>
          <th>1d</th>
          <th>7d</th>
          <th>30d</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(tickers).map(ticker => {
          const stock = stocks[ticker];
          return (
            <tr key={ticker}>
              <td>{ticker.toUpperCase()}</td>
              <td>{<USD amount={stock.close} className="text-primary" />}</td>
              <td>{stock.d1 ? <USD amount={stock.d1} /> : "N/A"}</td>
              <td>{stock.d7 ? <USD amount={stock.d7} /> : "N/A"}</td>
              <td>{stock.d30 ? <USD amount={stock.d30} /> : "N/A"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : <p className="text-danger">No matched tickers</p>;

  return (
    <div className="Stocks">
      <div className="row">
        <div className="col-4">
          <h1>Stocks</h1>
        </div>
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            placeholder="Filter..."
            value={filter}
            onChange={onChange} />
        </div>
      </div>
      {stocksList}
    </div>
  );
};

export default Stocks;
