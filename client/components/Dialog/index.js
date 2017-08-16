import React, {Component} from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';


class Dialog extends Component {
  constructor(props){
    super(props);
  }


  handleClose = () => {
    this.props.closeDialog();
  }
  render() {
    const { open } = this.props;
    return (
      <div>
        {
          open &&
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose}>
              { this.props.children }
            </ModalDialog>
          </ModalContainer>
        }
      </div>
    )
  }
}

export default Dialog;
