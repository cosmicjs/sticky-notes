import React, {Component} from 'react';
import { ChromePicker } from 'react-color';


class ColorPickerField extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <ChromePicker
        color={this.props.color||"#000"}
        onChangeComplete={this.props.changeColor}
      />
    )
  }
}

export default ColorPickerField;
