import React, {Component} from 'react';
import Dialog from '../Dialog';
import StickyNotes from '../StickyNotes';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      content: "",
      selectedGroup: null,
      openAddDialog: false,
      openEditDialog: false,
      group: {
        title: "",
      },
    }
  }

  addGroup = () => {
    const { title, content } = this.state;
    this.props.addGroup({
      title,
      content,
    });
    this.setState({ title: "", content: "", openAddDialog: false })
  }


  editGroup = () => {
    const { group, selectedGroup } = this.state;
    const { state } = this;
    this.props.editGroup({
      title: group.title,
      content: group.content,
    }, group.slug, selectedGroup);
    this.setState({ ...state, group: { title: "" }, openEditDialog: false })
  }

  goToNoteGroup = (group) => {
    this.props.changeRoute(`/group/${group.get('slug')}/${group.get('_id')}`);
  }

  editOption = (group, selectedGroup) => {
    this.setState({
      openEditDialog: true,
      group: group.toJS(),
      selectedGroup,
    });
  }
  render() {
    const { groups } = this.props;
    const { state } = this;
    const { title, content, openAddDialog, openEditDialog, group } = this.state;

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
      <div className="row">
        <button style={styles.btnCircle} className="btn btn-primary btn-lg" onClick={() => this.setState({ openAddDialog: true })}>
          <i className="fa fa-plus"></i>
        </button>
      <Dialog
        open={openAddDialog}
        closeDialog={() => this.setState({ openAddDialog: false })}
      >
        <div className="container-fluid">
          <div className="col-xs-12">
            <input placeholder="Enter Name ..." type="text" style={{ margin: "1vh 0" }} value={title} className="form-control" onChange={(e) => this.setState({ title: e.target.value })} />
          </div>
          <div className="col-xs-12">
            <textarea placeholder="Enter Description ..." rows="4" cols="50" style={{ margin: "1vh 0" }} className="form-control" onChange={(e) => this.setState({ content: e.target.value })}>
              {content}
            </textarea>
          </div>
          <div className="col-xs-12">
            <input type="button" disabled={title === "" && "disabled"} style={{ margin: "1vh 0" }} value="Add Group" className="btn btn-primary btn-lg" onClick={this.addGroup} />
          </div>
        </div>
      </Dialog>

      <Dialog
        open={openEditDialog}
        closeDialog={() => this.setState({ openEditDialog: false })}
      >
        <div className="container-fluid">
          <div className="col-xs-12">
            <input style={{ margin: "1vh 0" }} type="text" value={group.title} className="form-control" onChange={(e) => this.setState({ ...state, group: {  ...this.state.group, title: e.target.value } })} />
          </div>
          <div className="col-xs-12">
            <textarea style={{ margin: "1vh 0" }} type="text" className="form-control" onChange={(e) => this.setState({ ...state, group: {  ...this.state.group, content: e.target.value } })}>
              {group.content||""}
            </textarea>
          </div>
          <div className="col-xs-12">
            <input disabled={group.title === "" && "disabled"} style={{ margin: "1vh 0" }} type="button" value="Edit Group" className="btn btn-warning btn-lg" onClick={this.editGroup} />
          </div>
        </div>
      </Dialog>

      {
        <StickyNotes
          options={groups}
          editOption={this.editOption}
          deleteOption={this.props.deleteGroup}
          handleClick={this.goToNoteGroup}
        />
      }
      </div>
      </div>
    )
  }
}

export default Home;
