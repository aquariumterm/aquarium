'use strict';

// Workaround; see <http://stackoverflow.com/questions/25402492/nw-reactjs-requring-in-multiple-files-does-not-work>
global.document = window.document;
global.navigator = window.navigator;

import React from 'react';

import Terminal from './components/Terminal';

import Sidebar from './components/Sidebar';

React.render(
  <div class ="term"><Terminal /><Sidebar /></div>,
  document.querySelector('main')
);

/*React.render(
  <Sidebar />,
  document.querySelector('side')
);*/
