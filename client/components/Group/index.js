import React, {Component} from 'react';
import Dialog from '../Dialog';
import StickyNotes from '../StickyNotes';

class Group extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      selectedNote: null,
      openAddDialog: false,
      openEditDialog: false,
      note: {
        title: "",
      },
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

  editNote = () => {
    const { note, selectedNote } = this.state;
    const { state } = this;
    this.props.editNote({
      title: note.title,
    }, note.slug, selectedNote);
    this.setState({ ...state, note: { title: "" }, openEditDialog: false })
  }

  editOption = (note, selectedNote) => {
    this.setState({
      openEditDialog: true,
      note: note.toJS(),
      selectedNote,
    });
  }

  render() {
    const { notes } = this.props;
    const { state } = this;
    const { title, openAddDialog, openEditDialog, note } = this.state;
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



      <Dialog
        open={openEditDialog}
        closeDialog={() => this.setState({ openEditDialog: false })}
      >
        <input type="text" value={note.title} className="form-control" onChange={(e) => this.setState({ ...state, note: {  ...this.state.note, title: e.target.value } })} />
        <input type="button" value="Edit Note" className="btn btn-warning btn-lg" onClick={this.editNote} />
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
