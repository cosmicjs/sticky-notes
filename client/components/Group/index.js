import React, {Component} from 'react';
import Dialog from '../Dialog';
import StickyNotes from '../StickyNotes';
import ColorPicker from '../ColorPicker';

class Group extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      content: "",
      color: "",
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
    const { title, color, content } = this.state;
    const { groupId, addedMedia } = this.props;
    const image = this.refs.imageFile.files[0];
    const file = this.refs.attachedFile.files[0];
    this.props.addNote({
      title,
      content,
      color,
      image,
      file,
    }, groupId);
    this.setState({ title: "", content: "", openAddDialog: false });
  }

  editNote = () => {
    const { note, selectedNote } = this.state;
    const { state } = this;
    let METAFIELDS = note;
    METAFIELDS.metafields[1].value = note.color || "#000"
    this.props.editNote({
      title: note.title,
      color: note.color || "#000",
      content: note.content,
      metafields: METAFIELDS.metafields,
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

    const { title, content, color, openAddDialog, openEditDialog, openViewDialog, note } = this.state;

    const styles = {
      btnCircle: {
        width: "30px",
        height: "30px",
        textAlign: "center",
        padding: "6px 0",
        fontSize: "12px",
        fontWeight: "700",
        lineHeight: "1.42",
        borderRadius: "15px",
        margin: "10px",
        border: "none",
        outline: "none",
        float: "right"
      }
    }

    return (
      <div className="container-fluid">
      <button style={styles.btnCircle}  onClick={() => this.setState({ openAddDialog: true })} className="btn btn-primary btn-lg">
        <i className="fa fa-plus"></i>
      </button>
      <Dialog
        open={openAddDialog}
        closeDialog={() => this.setState({ openAddDialog: false })}
      >
        <div className="container-fluid">
          <div className="col-xs-12">
            <input style={{ margin: "1vh 0" }} type="text" className="form-control" value={title} onChange={(e) => this.setState({ title: e.target.value })} /> <br />
          </div>
          <div className="col-xs-12">
            <textarea style={{ margin: "1vh 0" }} type="text" className="form-control" value={content} onChange={(e) => this.setState({ content: e.target.value })} /> <br />
          </div>
          <div className="col-xs-12">
            <input style={{ margin: "1vh 0" }} type="file" className="form-control" ref="imageFile" /> <br />
          </div>
          <div className="col-xs-12">
            <input style={{ margin: "1vh 0" }} type="file" className="form-control" ref="attachedFile" /> <br />
          </div>
          <div className="col-xs-12">
            <ColorPicker color={color} changeColor={(color) => this.setState({ color: color.hex })} />
          </div>
          <div className="col-xs-12">
            <input disabled={(title === "" || content === "") && "disabled"} style={{ margin: "1vh 0" }} type="button" className="btn btn-success btn-md" value="Add Note" onClick={this.addNote} />
          </div>
        </div>
      </Dialog>



      <Dialog
        open={openEditDialog}
        closeDialog={() => this.setState({ openEditDialog: false })}
      >
        <div className="container-fluid">
          <div className="col-xs-12">
            <input style={{ margin: "1vh 0" }} type="text" value={note.title} className="form-control" onChange={(e) => this.setState({ ...state, note: {  ...this.state.note, title: e.target.value } })} />
          </div>
          <div className="col-xs-12">
            <textarea style={{ margin: "1vh 0" }} type="text" value={note.content||""} className="form-control" onChange={(e) => this.setState({ ...state, note: {  ...this.state.note, content: e.target.value } })} />
          </div>
          <div className="col-xs-12">
            <ColorPicker color={note.color} changeColor={(color) => this.setState({ ...state, note: { ...this.state.note, color: color.hex }})} />
          </div>
          <div className="col-xs-12">
            <input disabled={(note.title === "" || note.content === "") && "disabled"} style={{ margin: "1vh 0" }} type="button" value="Edit Note" className="btn btn-warning btn-lg" onClick={this.editNote} />
          </div>
        </div>
      </Dialog>

      <Dialog
        open={openViewDialog}
        closeDialog={() => this.setState({ openViewDialog: false })}
      >
        <div className="container-fluid">
          <div className="col-xs-12">
            <h1 style={{ margin: "1vh 0" }}>{note.title}</h1>
          </div>
          <div className="col-xs-12">
            <p style={{ margin: "1vh 0" }}>{note.content}</p>
          </div>
          {
            !!note.metadata && !!note.metadata.feature_image &&
            <div className="col-xs-12">
              <img style={{ margin: "1vh 0" }} width="128" height="128" src={note.metadata.feature_image.imgix_url} />
            </div>
          }
          {
            !!note.metadata && !!note.metadata.attachment &&
            <div className="col-xs-12">
              <a style={{ margin: "1vh 0" }} href={note.metadata.attachment.imgix_url} target="_blank">Click on this link to open attachment in the new link</a>
            </div>
          }
        </div>
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
