import React from 'react';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import Home from './Home';

const Routes = () => {
  return (
    <Router history={browserHistory}>
        <Route path="/" component={Home} />
    </Router>
  )
};

const mapState = ({tasks}) => ({tasks});
const mapDispatch = {getAllTasks};

export default connect(null, null)(Routes);
