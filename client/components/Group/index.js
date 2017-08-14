import React, {Component} from 'react';
import Dialog from '../Dialog';
import StickyNotes from '../StickyNotes';

class Group extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      content: "",
      selectedNote: null,
      openAddDialog: false,
      openEditDialog: false,
      openViewDialog: false,
      note: {
        title: "",
      },
    }
  }

  addNote = () => {
    const { title, content } = this.state;
    const { groupId, addedMedia } = this.props;
    const image = this.refs.imageFile.files[0];
    const file = this.refs.attachedFile.files[0];
    this.props.addNote({
      title,
      content,
      image,
      file,
    }, groupId);
    this.setState({ title: "", content: "", openAddDialog: false });
  }

  editNote = () => {
    const { note, selectedNote } = this.state;
    const { state } = this;
    this.props.editNote({
      title: note.title,
      content: note.content,
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

  goToNote = (note) => {
    this.setState({
      note: note.toJS(),
      openViewDialog: true,
    })
  }
  render() {
    const { notes } = this.props;
    const { state } = this;
    const { title, content, openAddDialog, openEditDialog, openViewDialog, note } = this.state;
    return (
      <div>
      <input type="button" value="Add Note" onClick={() => this.setState({ openAddDialog: true })} className="btn btn-primary btn-lg" />
      <Dialog
        open={openAddDialog}
        closeDialog={() => this.setState({ openAddDialog: false })}
      >
          <input type="text" className="form-control" value={title} onChange={(e) => this.setState({ title: e.target.value })} /> <br />
          <input type="text" className="form-control" value={content} onChange={(e) => this.setState({ content: e.target.value })} /> <br />
          <input type="file" className="form-control" ref="imageFile" /> <br />
          <input type="file" className="form-control" ref="attachedFile" /> <br />
          <input type="button" className="btn btn-success btn-md" value="Add Note" onClick={this.addNote} />
      </Dialog>



      <Dialog
        open={openEditDialog}
        closeDialog={() => this.setState({ openEditDialog: false })}
      >
        <input type="text" value={note.title} className="form-control" onChange={(e) => this.setState({ ...state, note: {  ...this.state.note, title: e.target.value } })} />
        <input type="text" value={note.content||""} className="form-control" onChange={(e) => this.setState({ ...state, note: {  ...this.state.note, content: e.target.value } })} />
        <input type="button" value="Edit Note" className="btn btn-warning btn-lg" onClick={this.editNote} />
      </Dialog>

      <Dialog
        open={openViewDialog}
        closeDialog={() => this.setState({ openViewDialog: false })}
      >
        <h1>{note.title}</h1>
        <p>{note.content}</p>
        {!!note.metafields && !!note.metafields[1] && note.metafields[1].key==="featured_image" && <img width="64" height="64" src={note.metafields[1].imgix_url} />}
        {!!note.metafields && !!note.metafields[1] && note.metafields[1].key==="attachment" && <a href={note.metafields[1].imgix_url} target="_blank">Attachment</a>}
        {!!note.metafields && !!note.metafields[2] && note.metafields[2].key==="attachment" && <a href={note.metafields[2].imgix_url} target="_blank">Attachment</a>}
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
