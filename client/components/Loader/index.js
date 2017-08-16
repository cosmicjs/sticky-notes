import React, {Component} from 'react';
import { BounceLoader } from 'react-spinners';


class Loader extends Component {
  constructor(props){
    super(props);
  }


  render() {
    const style = {
      position: "fixed",
      top: "50%",
      left: "50%",
      marginTop: "-9em",
      marginLeft: "-15em",
    };
    return (
      <div style={style}>
        <BounceLoader
          color={'#123abc'}
          loading
          size={300}
        />
      </div>
    )
  }
}

export default Loader;
