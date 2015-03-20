'use strict';

// Workaround; see <http://stackoverflow.com/questions/25402492/nw-reactjs-requring-in-multiple-files-does-not-work>
global.document = window.document;
global.navigator = window.navigator;

import React from 'react';

import Terminal from './components/Terminal';
import TerminalActions from './actions/TerminalActions';
import TerminalConstants from './constants/TerminalConstants';

TerminalActions.sendRawCommands(TerminalConstants.KnownCommands);

React.render(
  <Terminal />,
  document.querySelector('main')
);
