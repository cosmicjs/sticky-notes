/* eslint-disable */
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import {
} from './actions';

import {
} from './selectors';

import Group from '../../components/Group';

export class GroupContainer extends React.Component {


  render() {
    return (
      <div>
      <Group
        groupSlug={this.props.params.groupSlug}
      />
      </div>
    );
  }
}

GroupContainer.propTypes = {

};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(GroupContainer);
