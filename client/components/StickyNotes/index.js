import React, {Component} from 'react';
import { NoteListWrapper, NoteWrapper, Note } from './styles';
import moment from 'moment/moment'
class StickyNotes extends Component {


  render() {
    const { options } = this.props;
    return (
      <NoteListWrapper>
        {
          !!options && options.toArray().map((option, index) => {
          return  <NoteWrapper key={`note_${index}`}>
              <Note backgroundColor={option.getIn(['metadata', 'color'])||"black"} color="#ffffff" rotate={index%2 === 0? -2 : 4}>
                <span onClick={() => this.props.handleClick(option)}>
                  <small>{moment(option.get('created')).fromNow()}</small>
                  <h4>{option.get('title').substring(0,11)}</h4>
                  <p>{option.get('content').substring(0, 41)}</p>
                </span>
                <span className="buttons">
                  <a onClick={() => this.props.deleteOption(option.toJS(), index)} className="pull-right"><i className="fa fa-trash-o"></i></a>
                  <a onClick={() => this.props.editOption(option, index)} style={{ marginRight: "1vw" }} className="pull-right"><i className="fa fa-pencil"></i></a>
                </span>
              </Note>
            </NoteWrapper>
          })
        }
      </NoteListWrapper>
    )
  }
}

export default StickyNotes;
