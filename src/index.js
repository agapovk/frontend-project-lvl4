// @ts-check

// import 'core-js/stable/index.js';
// import 'regenerator-runtime/runtime.js';

// import '../assets/application.scss';

// if (process.env.NODE_ENV !== 'production') {
//   localStorage.debug = 'chat:*';
// }

import ReactDOM from 'react-dom';
import React from 'react';

import App from './components/App.js';

ReactDOM.render(<App />, document.getElementById('chat'));
