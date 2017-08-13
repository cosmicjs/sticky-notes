import React, {Component} from 'react';

class Group extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Here you go! Group {this.props.groupSlug} Page</h1>
      </div>
    )
  }
}

export default Group;
