import React, {Component} from 'react';

class Note extends Component {
  constructor(props){
    super(props);
    this.state = {
      editMode: false,
      editableTitle: "",
    }
  }


  editNote = () => {
    const { note, index } = this.props;
    const { editableTitle } = this.state;
    this.props.editNote({
      title: editableTitle
    }, note.get('slug'), index);
    this.setState({ editMode: false });
  }

  render() {
    const { note, index } = this.props;
    const { editMode, editableTitle } = this.state;
    return (
      <div>
        <div style={{ display: "flex" }}>
        <h1>{note.get('title')}</h1>
        <small style={{ marginTop: "5vh", marginLeft: "1vw" }}>{note.get('slug')}</small>
        </div>
        <input type="button" value="Delete" onClick={() => this.props.deleteNote(note.get('slug'), index)} />
        <input type="button" value="Update" onClick={() => this.setState({ editMode: !editMode, editableTitle: note.get('title') })} />
        <br />
        {editMode && <span><input type="text" value={editableTitle} onChange={(e) => this.setState({ editableTitle: e.target.value })} />
        <input type="button" value="Edit" onClick={this.editNote} /></span>}
      </div>
    )
  }
}

export default Note;
