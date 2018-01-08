import React, { Component } from 'react';
import Trades from '../components/Trades';

class TradesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
  }

  onChangeQuantity = e => {
    e.preventDefault();
    const quantity = +e.target.value > 0 ? +e.target.value : 0;
    this.setState({ quantity });
  }

  render() {
    return (
      <div className="TradesContainer">
        <Trades
          ticker={this.props.tickers[this.props.match.params.ticker]}
          symbol={this.props.match.params.ticker}
          date={this.props.date}
          stock={this.props.stocks.byDate[this.props.date][this.props.match.params.ticker]}
          tickers={this.props.tickers}
          quantity={this.state.quantity}
          onChangeQuantity={this.onChangeQuantity} />
      </div>
    );
  }
}

export default TradesContainer;
