# How to build sticky notes app using react.js #

In this tutorial, I'm going to show you how to create a simple **Sticky Notes** app using React, Redux, Selectors, Redux Sagas, a little bit of Node, and Cosmic JS. For the sake of understanding how to consume Restful API’s, this tutorial will show how to make AJAX (XHR) requests to the Cosmic JS API in order to retrieve, add, update, and delete data/media in our Cosmic JS buckets. Let's get started.

[Download the GitHub repo.!](http://google.com)
[Check out the demo.!](http://google.com)

```json
{
    name: "sticky-notes",
    version: "1.0.0",
    description: "Sticky Notes app built using react, redux & cosmic.",
    main: "index.js",
    scripts: {
        start: "npm run build; node server/index.js",
        start - dev: "nodemon server/index.js",
        build: "webpack -p",
        build - dev: "webpack -w",
        test: "echo "
        Error: no test specified " && exit 1"
    },
    repository: {
        type: "git",
        url: "git+https://github.com/jazibsawar/sticky-notes.git"
    },
    author: "Muhammad Musa",
    license: "ISC",
    bugs: {
        url: "https://github.com/jazibsawar/sticky-notes/issues"
    },
    homepage: "https://github.com/jazibsawar/sticky-notes#readme",
    dependencies: {
        async: "^2.5.0",
        babel: "^6.23.0",
        babel - core: "^6.25.0",
        babel - loader: "^7.1.1",
        babel - plugin - transform - class - properties: "^6.24.1",
        babel - plugin - transform - regenerator: "^6.24.1",
        babel - polyfill: "^6.23.0",
        babel - preset - es2015: "^6.24.1",
        babel - preset - react: "^6.24.1",
        babel - preset - stage - 0: "^6.24.1",
        body - parser: "^1.17.2",
        cosmicjs: "^2.39.91",
        express: "^4.15.3",
        immutable: "^3.8.1",
        moment: "^2.18.1",
        prop - types: "^15.5.10",
        react: "^15.6.1",
        react - addons - css - transition - group: "^15.6.0",
        react - addons - transition - group: "^15.6.0",
        react - color: "^2.13.4",
        react - dom: "^15.6.1",
        react - modal - dialog: "^4.0.7",
        react - redux: "^5.0.5",
        react - router: "^3.0.5",
        react - spinners: "0.0.30",
        redux: "^3.7.2",
        redux - logger: "^3.0.6",
        redux - saga: "^0.15.6",
        redux - thunk: "^2.2.0",
        reselect: "^3.0.1",
        styled - components: "^2.1.1",
        volleyball: "^1.4.1",
        webpack: "^3.4.1",
        webpack - livereload - plugin: "^0.11.0",
        whatwg - fetch: "^2.0.3"
    },
    devDependencies: {
        chai: "^4.1.0",
        cross - env: "^5.0.1",
        mocha: "^3.5.0",
        nodemon: "^1.11.0"
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
