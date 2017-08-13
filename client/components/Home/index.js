import React, {Component} from 'react';
import GroupElement from './GroupElement';
class Home extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const { groups } = this.props;
    return (
      <div>
      {
        !!groups && groups.toArray().map((group, i) => (
          <GroupElement
            key={`group_${i}`}
            group={group}
            index={i}
            deleteGroup={this.props.deleteGroup}
          />
        ))
      }
      </div>
    )
  }
}

export default Home;
