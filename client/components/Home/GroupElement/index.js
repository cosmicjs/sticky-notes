import React, {Component} from 'react';

class GroupElement extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const { group } = this.props;
    return (
      <div>
        <h1>{group.get('title')}</h1>
        <p>{group.get('slug')}</p>
      </div>
    )
  }
}

export default GroupElement;
