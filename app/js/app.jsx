'use strict';

// Workaround; see <http://stackoverflow.com/questions/25402492/nw-reactjs-requring-in-multiple-files-does-not-work>
global.document = window.document;
global.navigator = window.navigator;

import React from 'react';

import Terminal from './components/Terminal';
import TerminalActions from './actions/TerminalActions';
import AppConstants from './constants/AppConstants';

TerminalActions.sendRawCommands(AppConstants.KnownCommands);

import Sidebar from './components/Sidebar';

React.render(
  <div class ="term">
    <Terminal />
    <Sidebar />
  </div>,
  document.querySelector('main')
);

