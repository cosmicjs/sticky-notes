import React, {Component} from 'react';
import GroupElement from './GroupElement';
class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
    }
  }

  addGroup = () => {
    const { title } = this.state;
    this.props.addGroup({
      title,
    })
  }

  render() {
    const { groups } = this.props;
    const { title } = this.state;
    return (
      <div>
      <input type="text" value={title} onChange={(e) => this.setState({ title: e.target.value })} />
      <input type="button" value="Add Group" onClick={this.addGroup} />

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
