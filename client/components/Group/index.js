import React, {Component} from 'react';
import NoteElement from './NoteElement';

class Group extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const { notes } = this.props;
    return (
      <div>
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
