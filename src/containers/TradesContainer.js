import React, { Component } from 'react';
import Trades from '../components/Trades';

class TradesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = this._initialState();
  }

  onChangeQuantity = e => {
    const quantity = +e.target.value > 0 ? +e.target.value : 0;
    this.setState({ quantity });
  }

  onChangeTradeType = e => {
    const tradeType = e.target.value;
    this.setState({ tradeType });
  }

  onSubmitTrade = (e, amount) => {
    const direction = this.state.tradeType === 'sell' ? 1 : -1;
    amount *= direction;

    this.props.createTransaction({
      ticker: this.props.match.params.ticker,
      quantity: this.state.quantity,
      type: this.state.tradeType,
      date: this.props.date,
      amount
    });
  }

  onResetTrade = e => {
    const state = this._initialState();
    this.setState(state);
  };

  render() {
    const stocksOnDate = this.props.stocks.byDate[this.props.date];
    const stock = stocksOnDate[this.props.match.params.ticker];
    const total = this.state.quantity * stock.close;
    return (
      <div className="TradesContainer">
        <Trades
          ticker={this.props.tickers[this.props.match.params.ticker]}
          symbol={this.props.match.params.ticker}
          stock={stock}
          bank={this.props.bank}
          date={this.props.date}
          quantity={this.state.quantity}
          tradeType={this.state.tradeType}
          total={total}
          onChangeQuantity={this.onChangeQuantity}
          onChangeTradeType={this.onChangeTradeType}
          onSubmitTrade={this.onSubmitTrade}
          onResetTrade={this.onResetTrade} />
      </div>
    );
  }

  _initialState() {
    return {
      quantity: 1,
      tradeType: 'buy'
    };
  }
}

export default TradesContainer;
