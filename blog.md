# How to build sticky notes app using react.js #

In this tutorial, I'm going to show you how to create a simple **Sticky Notes** app using React, Redux, Selectors, Redux Sagas, a little bit of Node, and Cosmic JS. For the sake of understanding how to consume Restful API’s, this tutorial will show how to make AJAX (XHR) requests to the Cosmic JS API in order to retrieve, add, update, and delete data/media in our Cosmic JS buckets. Let's get started.

[Download the GitHub repo.!](https://github.com/jazibsawar/sticky-notes/)

[Check out the demo.!](https://github.com/jazibsawar/sticky-notes/)

```json
{
  "name": "sticky-notes",
  "version": "1.0.0",
  "description": "Sticky Notes app built using react, redux & cosmic.",
  "main": "index.js",
  "scripts": {
    "start": "npm run build; node server/index.js",
    "start-dev": "nodemon server/index.js",
    "build": "webpack -p",
    "build-dev": "webpack -w",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/jazibsawar/sticky-notes.git"
  },
  "author": "Muhammad Musa",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/jazibsawar/sticky-notes/issues"
  },
  "homepage": "https://github.com/jazibsawar/sticky-notes#readme",
  "dependencies": {
    "async": "^2.5.0",
    "babel": "^6.23.0",
    "babel-core": "^6.25.0",
    "babel-loader": "^7.1.1",
    "babel-plugin-transform-class-properties": "^6.24.1",
    "babel-plugin-transform-regenerator": "^6.24.1",
    "babel-polyfill": "^6.23.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "body-parser": "^1.17.2",
    "cosmicjs": "^2.39.91",
    "express": "^4.15.3",
    "immutable": "^3.8.1",
    "moment": "^2.18.1",
    "prop-types": "^15.5.10",
    "react": "^15.6.1",
    "react-addons-css-transition-group": "^15.6.0",
    "react-addons-transition-group": "^15.6.0",
    "react-color": "^2.13.4",
    "react-dom": "^15.6.1",
    "react-modal-dialog": "^4.0.7",
    "react-redux": "^5.0.5",
    "react-router": "^3.0.5",
    "react-spinners": "0.0.30",
    "redux": "^3.7.2",
    "redux-logger": "^3.0.6",
    "redux-saga": "^0.15.6",
    "redux-thunk": "^2.2.0",
    "reselect": "^3.0.1",
    "styled-components": "^2.1.1",
    "volleyball": "^1.4.1",
    "webpack": "^3.4.1",
    "webpack-livereload-plugin": "^0.11.0",
    "whatwg-fetch": "^2.0.3"
  },
  "devDependencies": {
    "chai": "^4.1.0",
    "cross-env": "^5.0.1",
    "mocha": "^3.5.0",
    "nodemon": "^1.11.0"
  }
}
```

### What we're installing and why: 
1. We're going to use the **whatwg-fetch** and **cosmicjs** library to handle our requests to our Cosmic JS bucket. 
2. We're installing **react** and **react-dom** to build our react components. 
3. We are going to use **redux**, react-redux, redux-logger, reselect and redux-sagas to help us implement what is called the Redux architecture. 
4. We have used **styled-components** to make the stickynotes component styling generic. We can pass style variables in it too. 
5. We used **react-spinners** to use loading component. 
6. We used **react-color** to use color picker component. 
7. We used **react-modal**-dialog to use react modal component. 
8. We used **immutable** packge by facebook to use immutable objects. 
9. We used **moment** to format dates. 
10. We used **react-router** for routing and navigation. 
11. The only thing worth mentioning in the dev dependencies is **webpack** and **volleyball**. Webpack will help us bundle all of our react and redux files into one large "bundle" file that will be used in our index.html. Volleyball is a cool little library that allows us to see in our console incoming and outgoing HTTP requests. 

### Building our app:
Now we we will set up our index.html in our client directory. Copy and paste the following code into your index.html file:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Cosmic Sticky Notes App!</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" >
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="/dist/bundle.js" defer></script>
</head>
<body id="top">
<div id="root"></div>
</body>
</html>
```

Here, we are going to target our **root** div to place our react components in later. The **bundle.js** file located in our dist directory is what our webpack.config file will spit out after bundling all of our react components Now, set up our webpack.config file to bundle all of our react files and export that bundle file to our dist directory. Copy the following code into your **webpack.config.js** file:

```javascript
var path = require('path');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var webpack = require('webpack');

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/dist')
  },
  context: __dirname,
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
  },
  module: {
    rules: [{
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'COSMIC_BUCKET': JSON.stringify(process.env.COSMIC_BUCKET),
        'COSMIC_READ_KEY': JSON.stringify(process.env.COSMIC_READ_KEY),
        'COSMIC_WRITE_KEY': JSON.stringify(process.env.COSMIC_WRITE_KEY)
      }
    }),
    new LiveReloadPlugin({appendScriptTag: true}),
  ]
};
```

Then, we have **server/index.js** file when we used **express** to make our server.

In Client folder there is store.js file which is creating redux store to manage states and data. The things that are happening are as follows: 
* We used redux-thunk & redux-sagas middlewares. 
* We used combineReducers to combine home & group reducer 
* Then we made store using the above things. 
* Then we triggers home & groups sagas. 

```javascript
import { createStore, applyMiddleware, combineReducers } from 'redux';
import homeReducer from './containers/Home/reducer';
import homeSagas from './containers/Home/sagas';


import groupReducer from './containers/Group/reducer';
import groupSagas from './containers/Group/sagas';

import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  sagaMiddleware,
  thunkMiddleware,
];

const reducers = combineReducers({
  home: homeReducer,
  group: groupReducer,
});
const store = createStore(
  reducers,
  applyMiddleware(...middlewares),
);

sagaMiddleware.run(homeSagas)
sagaMiddleware.run(groupSagas)

export default store;
```
Now we have client/Routes.js. Here, we have two routes: 
1. Path="/" => Lists all groups 
2. Path="/group/:groupSlug/:groupId" => list all notes against some groups 

```javascript
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Home from './containers/Home';
import Group from './containers/Group';

const Routes = ({}) => {
  return (
    <Router history={browserHistory}>
        <Route path="/" component={Home} />
        <Route path="/group/:groupSlug/:groupId" component={Group} />
    </Router>
  )
};

// const mapState = ({}) => ({});
// const mapDispatch = {};

export default connect(null, null)(Routes);
```

In client folder we have create a configuration file inorder to save API_KEYS and COSMIC BUCKET NAME. You can edit this file to use your own keys and slugs.

```javascript
export default {
  bucket: {
    slug: process.env.COSMIC_BUCKET || 'sticky-note-app',
    read_key: "YOUR READ KEY",
    write_key: "YOUR WRITE KEY",
  }
}
```
### There are two utils: 
* Request 
* Cosmic

#### Request
Request uses whatwg-fetch to hit AJAX requests to Cosmic API. This util is used to call those endpoints which are not present in cosmicjs package e.g deleteMedia and searchObjects based on filters

#### Cosmic
Cosmic uses cosmicjs package to hit AJAX request to Cosmic API.

### There are two container: 
* Home 
* Group 

#### Home
This container lists down groups. This group add new Note Group. It also edits and delete NoteGroups. This selects NoteGroup data from reducers and passes them to their components. This also passes add, edit and delete NtoeGroup actions to the home component.

#### Group
This selects Notes data from reducers and passes them to their components. This also passes add, edit and delete Notes actions to the home component. 

### There are following components in this app
* **ColorPicker**
* **Dialog**
* **Loader**
* **StickyNotes**
* **Home**
* **Group**

#### ColorPicker
This component is for picking the color of Sticky Note. 
```javascript
import React, {Component} from 'react';
import { ChromePicker } from 'react-color';


class ColorPickerField extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <ChromePicker
        color={this.props.color}
        onChangeComplete={this.props.changeColor}
      />
    )
  }
}

export default ColorPickerField;
```

#### Dialog
This component will show the popups and dialogs to get input data and output responses
```javascript
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
```

#### Loader
This is a loader component and it triggers whenever an ajax request in taking place. 
```javascript
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
```

#### StickyNotes
This component takes an array of options and convert them to stickynotes with edit, heading onclick and delete handler. 
```javascript
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
                <small>{moment(option.get('created')).fromNow()}</small>
                <h4 onClick={() => this.props.handleClick(option)}>{option.get('title').substring(0,11)}</h4>
                <p>{option.get('content').substring(0, 41)}</p>
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
```

#### Home
This is a component where we feed NoteGroup options to StickyNotes component and have add, edit and delete handlers. 
```javascript
import React, {Component} from 'react';
import Dialog from '../Dialog';
import StickyNotes from '../StickyNotes';
import ColorPicker from '../ColorPicker';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      content: "",
      color: "#fff",
      selectedGroup: null,
      openAddDialog: false,
      openEditDialog: false,
      group: {
        title: "",
      },
    }
  }

  addGroup = () => {
    const { title, content, color } = this.state;
    this.props.addGroup({
      title,
      content,
      color,
    });
    this.setState({ title: "", content: "", openAddDialog: false })
  }


  editGroup = () => {
    const { group, selectedGroup } = this.state;
    const { state } = this;
    this.props.editGroup({
      title: group.title,
      content: group.content,
      color: group.color,
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
    const { title, content, color, openAddDialog, openEditDialog, group } = this.state;

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
            <textarea value={content} placeholder="Enter Description ..." rows="4" cols="50" style={{ margin: "1vh 0" }} className="form-control" onChange={(e) => this.setState({ content: e.target.value })} />
          </div>

          <div className="col-xs-12">
            <ColorPicker color={color} changeColor={(color) => this.setState({ color: color.hex })} />
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
            <textarea value={group.content||""} style={{ margin: "1vh 0" }} type="text" className="form-control" onChange={(e) => this.setState({ ...state, group: {  ...this.state.group, content: e.target.value } })} />
          </div>
          <div className="col-xs-12">
            <ColorPicker color={group.color} changeColor={(color) => this.setState({ ...state, group: { ...this.state.group, color: color.hex }})} />
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
```

#### Group
This is a component where we feed Notes options to StickyNotes component and have add, edit and delete handlers. 
```javascript
import React, {Component} from 'react';
import Dialog from '../Dialog';
import StickyNotes from '../StickyNotes';
import ColorPicker from '../ColorPicker';

class Group extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      content: "",
      color: "",
      selectedNote: null,
      openAddDialog: false,
      openEditDialog: false,
      openViewDialog: false,
      note: {
        title: "",
      },
    }
  }

  addNote = () => {
    const { title, color, content } = this.state;
    const { groupId, addedMedia } = this.props;
    const image = this.refs.imageFile.files[0];
    const file = this.refs.attachedFile.files[0];
    this.props.addNote({
      title,
      content,
      color,
      image,
      file,
    }, groupId);
    this.setState({ title: "", content: "", openAddDialog: false });
  }

  editNote = () => {
    const { note, selectedNote } = this.state;
    const { state } = this;
    let METAFIELDS = note;
    METAFIELDS.metafields[1].value = note.color || "#000"
    this.props.editNote({
      title: note.title,
      color: note.color || "#000",
      content: note.content,
      metafields: METAFIELDS.metafields,
    }, note.slug, selectedNote);
    this.setState({ ...state, note: { title: "" }, openEditDialog: false })
  }

  editOption = (note, selectedNote) => {
    this.setState({
      openEditDialog: true,
      note: note.toJS(),
      selectedNote,
    });
  }

  goToNote = (note) => {
    this.setState({
      note: note.toJS(),
      openViewDialog: true,
    })
  }
  render() {
    const { notes } = this.props;
    const { state } = this;

    const { title, content, color, openAddDialog, openEditDialog, openViewDialog, note } = this.state;

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
      <button style={styles.btnCircle}  onClick={() => this.setState({ openAddDialog: true })} className="btn btn-primary btn-lg">
        <i className="fa fa-plus"></i>
      </button>
      <Dialog
        open={openAddDialog}
        closeDialog={() => this.setState({ openAddDialog: false })}
      >
        <div className="container-fluid">
          <div className="col-xs-12">
            <input style={{ margin: "1vh 0" }} type="text" className="form-control" value={title} onChange={(e) => this.setState({ title: e.target.value })} /> <br />
          </div>
          <div className="col-xs-12">
            <textarea style={{ margin: "1vh 0" }} type="text" className="form-control" value={content} onChange={(e) => this.setState({ content: e.target.value })} /> <br />
          </div>
          <div className="col-xs-12">
            <input style={{ margin: "1vh 0" }} type="file" className="form-control" ref="imageFile" /> <br />
          </div>
          <div className="col-xs-12">
            <input style={{ margin: "1vh 0" }} type="file" className="form-control" ref="attachedFile" /> <br />
          </div>
          <div className="col-xs-12">
            <ColorPicker color={color} changeColor={(color) => this.setState({ color: color.hex })} />
          </div>
          <div className="col-xs-12">
            <input disabled={(title === "" || content === "") && "disabled"} style={{ margin: "1vh 0" }} type="button" className="btn btn-success btn-md" value="Add Note" onClick={this.addNote} />
          </div>
        </div>
      </Dialog>



      <Dialog
        open={openEditDialog}
        closeDialog={() => this.setState({ openEditDialog: false })}
      >
        <div className="container-fluid">
          <div className="col-xs-12">
            <input style={{ margin: "1vh 0" }} type="text" value={note.title} className="form-control" onChange={(e) => this.setState({ ...state, note: {  ...this.state.note, title: e.target.value } })} />
          </div>
          <div className="col-xs-12">
            <textarea style={{ margin: "1vh 0" }} type="text" value={note.content||""} className="form-control" onChange={(e) => this.setState({ ...state, note: {  ...this.state.note, content: e.target.value } })} />
          </div>
          <div className="col-xs-12">
            <ColorPicker color={note.color} changeColor={(color) => this.setState({ ...state, note: { ...this.state.note, color: color.hex }})} />
          </div>
          <div className="col-xs-12">
            <input disabled={(note.title === "" || note.content === "") && "disabled"} style={{ margin: "1vh 0" }} type="button" value="Edit Note" className="btn btn-warning btn-lg" onClick={this.editNote} />
          </div>
        </div>
      </Dialog>

      <Dialog
        open={openViewDialog}
        closeDialog={() => this.setState({ openViewDialog: false })}
      >
        <div className="container-fluid">
          <div className="col-xs-12">
            <h1 style={{ margin: "1vh 0" }}>{note.title}</h1>
          </div>
          <div className="col-xs-12">
            <p style={{ margin: "1vh 0" }}>{note.content}</p>
          </div>
          {
            !!note.metadata && !!note.metadata.feature_image &&
            <div className="col-xs-12">
              <img style={{ margin: "1vh 0" }} width="128" height="128" src={note.metadata.feature_image.imgix_url} />
            </div>
          }
          {
            !!note.metadata && !!note.metadata.attachment &&
            <div className="col-xs-12">
              <a style={{ margin: "1vh 0" }} href={note.metadata.attachment.imgix_url} target="_blank">Click on this link to open attachment in the new link</a>
            </div>
          }
        </div>
      </Dialog>

      <StickyNotes
        options={notes}
        editOption={this.editOption}
        deleteOption={this.props.deleteNote}
        handleClick={this.goToNote}
      />
      </div>
    )
  }
}

export default Group;
```

## Conclusion 
So, this is an app where every scenario of Cosmic RESTful API is covered. I hope you like the tutorial. 
