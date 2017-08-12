import React, {Component} from 'react';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Here you go! Home Page</h1>
      </div>
    )
  }
}

// const mapState = ({}) => ({});
export default connect(null)(Home);
