import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import App from '../components/App';
import Profile from '../components/Profile';
import About from '../components/About';
import NotFound from '../components/NotFound';

export default class Routes extends React.Component {
  render() {
    return (
      <Router>
        <App />
        <Switch>
          <Route exact={true} path="/" component={Profile} />
          <Route path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}
