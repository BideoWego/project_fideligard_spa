import React, { Component } from 'react';
import {
  Route,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom';
import Title from './components/Title';
import Error404 from './components/Error404';
import Navigation from './components/Navigation';
import DatesContainer from './containers/DatesContainer';
import Portfolios from './components/Portfolios';
import StocksContainer from './containers/StocksContainer';
import TradesContainer from './containers/TradesContainer';
import Transactions from './components/Transactions';
import { default as data } from './data/scrubbed';
import { default as transactions } from './data/transactions';
import { default as portfolio } from './data/portfolio';

class App extends Component {
  constructor(props) {
    super(props);
     // TODO change bank to be date sensitive
    this.state = Object.assign({
      selectedDateIndex: 0,
      selectedDate: data.dates[0],
      nextTransactionId: 5,
      bank: 1000000,
      transactions,
      portfolio
    }, data);
  }

  setSelectedDateIndex = index => {
    this.setState({
      selectedDateIndex: index,
      selectedDate: this.state.dates[index]
    });
  }

  createTransaction = transaction => {
    this.setState({
      transactions: [
        ...this.state.transactions,
        {
          id: this.state.nextTransactionId,
          ...transaction
        }
      ],
      nextTransactionId: this.state.nextTransactionId + 1,
      bank: this.state.bank + transaction.amount
    }, () => console.log(this.state));
  }

  render() {
    const positions = this.state.portfolio.positions[this.state.selectedDate];

    return (
      <div id="app" className="App">
        <Title title="Fideligard" />
        <Navigation />
          <Switch>
            <Route
              exact
              path="/404"
              render={
                props => <Error404 {...props} backUrl="/portfolios" />
              } />
            <Route path="*" render={props => (
              <div className="row justify-content-around">
                <div className="col-5">
                  <StocksContainer
                    stocks={this.state.stocks.byDate}
                    tickers={this.state.tickers}
                    date={this.state.selectedDate}
                    {...props} />
                </div>
                <div className="col-5">
                  <DatesContainer
                    dates={this.state.dates}
                    setSelectedDateIndex={this.setSelectedDateIndex}
                    selectedDateIndex={this.state.selectedDateIndex} />
                  <Switch>
                    {/* TODO make PortfoliosContainer for calculations */}
                    <Route exact path="/" render={() => (
                      <Redirect to="/portfolios" />
                    )} />
                    <Route exact path="/portfolios" render={props => (
                      <Portfolios
                        bank={this.state.bank}
                        positions={positions} />
                    )} />
                    <Route
                      exact
                      path="/transactions"
                      render={props => (
                        <Transactions transactions={this.state.transactions} />
                      )} />
                    <Route path="/trades/:ticker" render={props => (
                      <TradesContainer
                        stocks={this.state.stocks}
                        date={this.state.selectedDate}
                        tickers={this.state.tickers}
                        createTransaction={this.createTransaction}
                        bank={this.state.bank}
                        {...props} />
                    )} />
                    <Redirect to="/404" />
                  </Switch>
                </div>
              </div>
            )} />
          </Switch>
      </div>
    );
  }
}

export default App;
