import React, { Component } from 'react';
import { Portfolios } from '../components';

class PortfoliosContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: props.positions
    };
  }

  render() {
    return (
      <Portfolios
        bank={this.props.bank}
        positions={this.state.positions} />
    );
  }
}

export default PortfoliosContainer;
