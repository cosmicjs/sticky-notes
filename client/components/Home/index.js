import React, {Component} from 'react';
import Dialog from '../Dialog';
import StickyNotes from '../StickyNotes';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      content: "",
      selectedGroup: null,
      openAddDialog: false,
      openEditDialog: false,
      group: {
        title: "",
      },
    }
  }

  addGroup = () => {
    const { title, content } = this.state;
    this.props.addGroup({
      title,
      content,
    });
    this.setState({ title: "", content: "", openAddDialog: false })
  }


  editGroup = () => {
    const { group, selectedGroup } = this.state;
    const { state } = this;
    this.props.editGroup({
      title: group.title,
      content: group.content,
    }, group.slug, selectedGroup);
    this.setState({ ...state, group: { title: "" }, openEditDialog: false })
  }

  goToNoteGroup = (group) => {
    this.props.changeRoute(`/group/${group.get('slug')}/${group.get('_id')}`);
  }

  editOption = (group, selectedGroup) => {
    this.setState({
      openEditDialog: true,
      group: group.toJS(),
      selectedGroup,
    });
  }
  render() {
    const { groups } = this.props;
    const { state } = this;
    const { title, content, openAddDialog, openEditDialog, group } = this.state;
    return (
      <div>

      <input type="button" value="Add Group" className="btn btn-primary btn-lg" onClick={() => this.setState({ openAddDialog: true })} />

      <Dialog
        open={openAddDialog}
        closeDialog={() => this.setState({ openAddDialog: false })}
      >
        <input type="text" value={title} className="form-control" onChange={(e) => this.setState({ title: e.target.value })} />
        <input type="text" value={content} className="form-control" onChange={(e) => this.setState({ content: e.target.value })} />
        <input type="button" value="Add Group" className="btn btn-primary btn-lg" onClick={this.addGroup} />
      </Dialog>

      <Dialog
        open={openEditDialog}
        closeDialog={() => this.setState({ openEditDialog: false })}
      >
        <input type="text" value={group.title} className="form-control" onChange={(e) => this.setState({ ...state, group: {  ...this.state.group, title: e.target.value } })} />
        <input type="text" value={group.content||""} className="form-control" onChange={(e) => this.setState({ ...state, group: {  ...this.state.group, content: e.target.value } })} />
        <input type="button" value="Edit Group" className="btn btn-warning btn-lg" onClick={this.editGroup} />
      </Dialog>

      {
        <StickyNotes
          options={groups}
          editOption={this.editOption}
          deleteOption={this.props.deleteGroup}
          handleClick={this.goToNoteGroup}
        />
      }
      </div>
    )
  }
}

export default Home;
