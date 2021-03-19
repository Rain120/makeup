import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { css } from '@emotion/css';
import c from 'classnames';

import App from '../components/App';
import Face from '../components/face';
import Video from '../components/video';

export default class Routes extends React.Component {
  render() {
    return (
      <Router>
        <App className={'app-wrapper'} active={'index'} />
        <div
          className={c(
            'app-body',
            css`
              padding: 20px;
              height: calc(100vh - 50px);
            `,
          )}
        >
          <Switch>
            <Route exact={true} path={'/'} component={Face} />
            <Route path={'/video'} component={Video} />
          </Switch>
        </div>
      </Router>
    );
  }
}
