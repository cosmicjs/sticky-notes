import React, {Component} from 'react';
import Dialog from '../Dialog';
import StickyNotes from '../StickyNotes';

class Group extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      openAddDialog: false,
    }
  }

  addNote = () => {
    const { title } = this.state;
    const { groupId } = this.props;
    this.props.addNote({
      title,
    }, groupId);
    this.setState({ title: "", openAddDialog: false });
  }
  render() {
    const { notes } = this.props;
    const { title, openAddDialog } = this.state;
    console.log("NOTES: ",notes)
    return (
      <div>
      <input type="button" value="Add Note" onClick={() => this.setState({ openAddDialog: true })} className="btn btn-primary btn-lg" />
      <Dialog
        open={openAddDialog}
        closeDialog={() => this.setState({ openAddDialog: false })}
      >
          <input type="text" className="form-control" value={title} onChange={(e) => this.setState({ title: e.target.value })} /> <br />
          <input type="button" className="btn btn-success btn-md" value="Add Note" onClick={this.addNote} />
      </Dialog>

      <StickyNotes
        options={notes}
        editOption={this.editOption}
        deleteOption={this.props.deleteNote}
        handleClick={this.goToNote}
      />
      </div>
    )
  }
}

export default Group;
