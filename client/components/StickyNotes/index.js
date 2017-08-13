import React, {Component} from 'react';
import { NoteListWrapper, NoteWrapper, Note } from './styles';
class StickyNotes extends Component {


  handleClick = () => {
    console.log("Clicked");
  }
  render() {
    const { groups } = this.props;
    return (
      <NoteListWrapper>
        {
          !!groups && groups.toArray().map((group, index) => (
            <NoteWrapper onClick={this.handleClick} key={`note_${index}`}>
              <Note backgroundColor="#23c6c8" color="#ffffff" rotate={4}>
                <small>{group.get('created')}</small>
                <h4>{group.get('title')}</h4>
                <p>{group.get('content')}</p>
                <a onClick={() => this.props.deleteGroup(group.get('slug'), index)} className="text-danger pull-right"><i className="fa fa-trash-o"></i></a>
                <a href="#" style={{ marginRight: "1vw" }} className="text-warning pull-right"><i className="fa fa-pencil"></i></a>
              </Note>
            </NoteWrapper>
          ))
        }
      </NoteListWrapper>
    )
  }
}

export default StickyNotes;
