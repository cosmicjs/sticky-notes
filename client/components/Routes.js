import React from 'react';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import Home from './Home';
import Group from './Group';

const Routes = ({}) => {
  return (
    <Router history={browserHistory}>
        <Route path="/" component={Home} />
        <Route path="/group/:groupSlug" component={Group} />
    </Router>
  )
};

// const mapState = ({}) => ({});
// const mapDispatch = {};

export default connect(null, null)(Routes);
