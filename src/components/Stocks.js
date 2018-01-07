import React from 'react';

const Stocks = () => (
  <div className="Stocks">
    <div className="row">
      <div className="col-4">
        <h1>Stocks</h1>
      </div>
      <div className="col-8">
        <input type="text" className="form-control" placeholder="Filter..."/>
      </div>
    </div>
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
        <tr>
          <td>AAPL</td>
          <td>1234.1234</td>
          <td>+1</td>
          <td>+1</td>
          <td>+1</td>
          <td>Trade</td>
        </tr>
        <tr>
          <td>AAPL</td>
          <td>1234.1234</td>
          <td>+1</td>
          <td>+1</td>
          <td>+1</td>
          <td>Trade</td>
        </tr>
        <tr>
          <td>AAPL</td>
          <td>1234.1234</td>
          <td>+1</td>
          <td>+1</td>
          <td>+1</td>
          <td>Trade</td>
        </tr>
        <tr>
          <td>AAPL</td>
          <td>1234.1234</td>
          <td>+1</td>
          <td>+1</td>
          <td>+1</td>
          <td>Trade</td>
        </tr>
        <tr>
          <td>AAPL</td>
          <td>1234.1234</td>
          <td>+1</td>
          <td>+1</td>
          <td>+1</td>
          <td>Trade</td>
        </tr>
        <tr>
          <td>AAPL</td>
          <td>1234.1234</td>
          <td>+1</td>
          <td>+1</td>
          <td>+1</td>
          <td>Trade</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default Stocks;
