import React, { Component } from 'react';
import { Stocks } from '../components';

class StocksContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      tickers: Object.assign({}, props.tickers)
    };
  }

  onChangeFilter = e => {
    const filter = e.target.value;
    const tickers = Object.assign({}, this.props.tickers);
    Object.keys(tickers).forEach(key => {
      if (!key.match(filter)) {
        delete tickers[key];
      }
    });

    this.setState({
      filter,
      tickers
    });
  }

  render() {
    return (
      <div className="StocksContainer">
        <Stocks
          stocks={this.props.stocks[this.props.date]}
          tickers={this.state.tickers}
          filter={this.state.filter}
          onChangeFilter={this.onChangeFilter} />
      </div>
    );
  }
}

export default StocksContainer;
