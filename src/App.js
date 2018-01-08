import React, { Component } from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Error404 from './components/Error404';
import Navigation from './components/Navigation';
import DatesContainer from './containers/DatesContainer';
import Portfolios from './components/Portfolios';
import StocksContainer from './containers/StocksContainer';
import TradesContainer from './containers/TradesContainer';
import Transactions from './components/Transactions';
import { default as data } from '../src/data/scrubbed';

class App extends Component {
  constructor() {
    super();
    this.state = Object.assign({
      selectedDateIndex: 0,
      selectedDate: data.dates[0],
      selectedTicker: 'aapl'
    }, data);
  }

  setSelectedDateIndex = index => {
    this.setState({
      selectedDateIndex: index,
      selectedDate: this.state.dates[index]
    });
  }

  render() {
    return (
      <div id="app" className="App">
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
                    <Route exact path="/" component={Portfolios} />
                    <Route exact path="/portfolios" component={Portfolios} />
                    <Route
                      exact
                      path="/transactions"
                      component={Transactions} />
                    <Route path="/trades/:ticker" render={props => (
                      <TradesContainer
                        stocks={this.state.stocks}
                        date={this.state.selectedDate}
                        tickers={this.state.tickers}
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
