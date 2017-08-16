import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Home from './containers/Home';
import Group from './containers/Group';

const Routes = ({}) => {
  return (
    <Router history={browserHistory}>
        <Route path="/" component={Home} />
        <Route path="/group/:groupSlug/:groupId" component={Group} />
    </Router>
  )
};

// const mapState = ({}) => ({});
// const mapDispatch = {};

export default connect(null, null)(Routes);
