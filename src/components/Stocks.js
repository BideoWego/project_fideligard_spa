import React from 'react';
import { default as USD, USDDiff } from './USD';
import { NavLink } from 'react-router-dom';
import { Input } from 'reactstrap';
import StringUtil from './StringUtil';

const Stocks = ({ stocks, tickers, filter, onChangeFilter, onClickTrade }) => {
  const stocksList = (
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
              <td>
                <StringUtil fn="upperCase" string={ticker} />
              </td>
              <td>{<USD amount={stock.close} className="text-primary" />}</td>
              <td>{<USDDiff amount={stock.d1} />}</td>
              <td>{<USDDiff amount={stock.d7} />}</td>
              <td>{<USDDiff amount={stock.d30} />}</td>
              <td>
                {<NavLink to={`/trades/${ ticker }`}>Trade</NavLink>}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  return (
    <div className="Stocks">
      <div className="row">
        <div className="col-4">
          <h1>Stocks</h1>
        </div>
        <div className="col-8">
          <Input
            type="text"
            className="form-control"
            placeholder="Filter..."
            value={filter}
            onChange={onChangeFilter} />
        </div>
      </div>
      {Object.keys(tickers).length ?
        stocksList :
        <p className="text-danger">No matched tickers</p>}
    </div>
  );
};

export default Stocks;
