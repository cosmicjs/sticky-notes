import React, {Component} from 'react';
import GroupElement from './GroupElement';
import Dialog from '../Dialog';
import StickyNotes from '../StickyNotes';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      openAddDialog: false,
    }
  }

  addGroup = () => {
    const { title } = this.state;
    this.props.addGroup({
      title,
    });
    this.setState({ title: "", openAddDialog: false })
  }

  goToNoteGroup = (group) => {
    this.props.changeRoute(`/group/${group.get('slug')}/${group.get('_id')}}`);
  }

  render() {
    const { groups } = this.props;
    const { title, openAddDialog } = this.state;
    return (
      <div>

      <input type="button" value="Add Group" className="btn btn-primary btn-lg" onClick={() => this.setState({ openAddDialog: true })} />
      <Dialog
        open={openAddDialog}
        closeDialog={() => this.setState({ openAddDialog: false })}
      >
        <input type="text" value={title} className="form-control" onChange={(e) => this.setState({ title: e.target.value })} />
        <input type="button" value="Add Group" className="btn btn-primary btn-lg" onClick={this.addGroup} />
      </Dialog>
      {
        <StickyNotes
          groups={groups}
          editGroup={this.props.editGroup}
          deleteGroup={this.props.deleteGroup}
          handleClick={this.goToNoteGroup}
        />
      }
      </div>
    )
  }
}

export default Home;
