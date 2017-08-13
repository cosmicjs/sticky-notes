import React, {Component} from 'react';

class Note extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const { note } = this.props;
    return (
      <div>
        <div style={{ display: "flex" }}>
        <h1>{note.get('title')}</h1>
        <small style={{ marginTop: "5vh", marginLeft: "1vw" }}>{note.get('slug')}</small>
        </div>
        <input type="button" value="Delete" onClick={() => this.props.deleteGroup(group.get('slug'), index)} />
      {/*   <input type="button" value="Update" onClick={() => this.setState({ editMode: !editMode, editableTitle: group.get('title') })} />
        <br />
        {editMode && <span><input type="text" value={editableTitle} onChange={(e) => this.setState({ editableTitle: e.target.value })} />
        <input type="button" value="Edit" onClick={this.editGroup} /></span>} */}
      </div>
    )
  }
}

export default Note;
