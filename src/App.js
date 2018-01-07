import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Error404 from './components/Error404';
import Navigation from './components/Navigation';
import DatesContainer from './containers/DatesContainer';
import Portfolios from './components/Portfolios';
import StocksContainer from './containers/StocksContainer';
import Trades from './components/Trades';
import Transactions from './components/Transactions';
import { default as data } from '../src/data/scrubbed';

class App extends Component {
  constructor() {
    super();
    this.state = Object.assign({
      selectedDateIndex: 0,
      selectedDate: data.dates[0]
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
      <Router>
        <div className="App">
          <Navigation />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/404"
                render={
                  props => <Error404 {...props} backUrl="/portfolios" />
                } />
              <Route path="/" render={() => (
                <div className="row">
                  <div className="col">
                    <StocksContainer
                      stocks={this.state.stocks.byDate}
                      tickers={this.state.tickers}
                      date={this.state.selectedDate} />
                  </div>
                  <div className="col">
                    <DatesContainer
                      dates={this.state.dates}
                      setSelectedDateIndex={this.setSelectedDateIndex}
                      selectedDateIndex={this.state.selectedDateIndex} />
                    <Switch>
                      <Route exact path="/portfolios" component={Portfolios} />
                      <Route exact path="/trades" component={Trades} />
                      <Route
                        exact
                        path="/transactions"
                        component={Transactions} />
                      <Redirect to="/404" />
                    </Switch>
                  </div>
                </div>
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
