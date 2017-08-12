import React, {Component} from 'react';
import { connect } from 'react-redux';

class Group extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Here you go! Group {this.props.params.groupSlug} Page</h1>
      </div>
    )
  }
}

// const mapState = ({}) => ({});
export default connect(null)(Group);
