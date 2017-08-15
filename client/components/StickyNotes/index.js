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
              <Note backgroundColor="black" color="#ffffff" rotate={index%2 === 0? -2 : 4}>
                <small>{moment(option.get('created')).fromNow()}</small>
                <h4 onClick={() => this.props.handleClick(option)}>{option.get('title').substring(0,11)}</h4>
                <p>{option.get('content').substring(0, 41)}</p>
                <a onClick={() => this.props.deleteOption(option.toJS(), index)} className="text-danger pull-right"><i className="fa fa-trash-o"></i></a>
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
