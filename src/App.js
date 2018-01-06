import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Error404 from './components/Error404';
import Navigation from './components/Navigation';
import Dates from './components/Dates';
import Portfolios from './components/Portfolios';
import Stocks from './components/Stocks';
import Trades from './components/Trades';
import Transactions from './components/Transactions';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navigation />
          <div className="container">
            <Switch>
              <Route exact path="/404" render={props => <Error404 {...props} backUrl="/portfolios" /> } />
              <Route path="/" render={() => (
                <div className="row">
                  <div className="col">
                    <Stocks />
                  </div>
                  <div className="col">
                    <Dates />
                    <Switch>
                      <Route exact path="/portfolios" component={Portfolios} />
                      <Route exact path="/trades" component={Trades} />
                      <Route exact path="/transactions" component={Transactions} />
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
