import React, {Component} from 'react';

class GroupElement extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const { group, index } = this.props;
    return (
      <div>
        <h1>{group.get('title')}</h1>
        <p>{group.get('slug')}</p>
        <input type="button" value="Delete" onClick={() => this.props.deleteGroup(group.get('slug'), index)} />
      </div>
    )
  }
}

export default GroupElement;
