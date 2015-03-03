'use strict';

// Workaround; see <http://stackoverflow.com/questions/25402492/nw-reactjs-requring-in-multiple-files-does-not-work>
global.document = window.document;
global.navigator = window.navigator;

/* ignore jslint start */

import React from 'react';

import Terminal from './components/Terminal';

/* ignore jslint end */

React.render(
  <Terminal />,
  document.querySelector('main')
);
