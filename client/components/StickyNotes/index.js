import React, {Component} from 'react';
import { NoteListWrapper, NoteWrapper, Note } from './styles';
import moment from 'moment/moment'
class StickyNotes extends Component {


  render() {
    const { options } = this.props;
    return (
      <NoteListWrapper>
        {
          !!options && options.toArray().map((option, index) => (
            <NoteWrapper key={`note_${index}`}>
              <Note backgroundColor="#23c6c8" color="#ffffff" rotate={4}>
                <small>{moment(option.get('created')).fromNow()}</small>
                <h4 onClick={() => this.props.handleClick(option)}>{option.get('title')}</h4>
                <p>{option.get('content')}</p>
                <a onClick={() => this.props.deleteOption(option.get('slug'), index)} className="text-danger pull-right"><i className="fa fa-trash-o"></i></a>
                <a onClick={() => this.props.editOption(option, index)} style={{ marginRight: "1vw" }} className="text-warning pull-right"><i className="fa fa-pencil"></i></a>
              </Note>
            </NoteWrapper>
          ))
        }
      </NoteListWrapper>
    )
  }
}

export default StickyNotes;
