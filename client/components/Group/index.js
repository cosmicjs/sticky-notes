import React, {Component} from 'react';
import NoteElement from './NoteElement';

class Group extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
    }
  }

  addNote = () => {
    const { title } = this.state;
    const { groupSlug } = this.props;
    this.props.addNote({
      title,
    }, groupSlug);
  }
  render() {
    const { notes } = this.props;
    const { title } = this.state;
    return (
      <div>
      <input type="text" value={title} onChange={(e) => this.setState({ title: e.target.value })} />
      <input type="button" value="Add Note" onClick={this.addNote} />
        {
          !!notes && notes.toArray().map((note, i) => (
            <NoteElement
              key={`note_${i}`}
              index={i}
              note={note}
            />
          ))
        }
      </div>
    )
  }
}

export default Group;
