'use strict';

// Workaround; see <http://stackoverflow.com/questions/25402492/nw-reactjs-requring-in-multiple-files-does-not-work>
global.document = window.document;
global.navigator = window.navigator;

import React from 'react';

import Terminal from './components/Terminal';
import TerminalActions from './actions/TerminalActions';
import AppConstants from './constants/AppConstants';

import Sidebar from './components/Sidebar';

import './stores/ShellStore';

TerminalActions.sendRawCommands(AppConstants.KnownCommands);

React.render(
  <div className="term">
    <Terminal />
    <Sidebar />
  </div>,
  document.querySelector('main')
);
