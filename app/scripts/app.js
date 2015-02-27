'use strict';

// Workaround; see <http://stackoverflow.com/questions/25402492/nw-reactjs-requring-in-multiple-files-does-not-work>
global.document = window.document;
global.navigator = window.navigator;

var React = require('react');
console.log(React);

var pty = require('pty.js');

var Terminal = require('term.js');

var terminal = new Terminal({
	cols: 80,
	rows: 30,
	screenKeys: true}
);

var shell = pty.spawn('bash', [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env
});

// from system shell
shell.on('data', function(data) {
  terminal.write(data);
});

// from user
terminal.on('data', function(data) {
  shell.write(data);
});

terminal.open(document.body);

//shell.resize(100, 40);
//shell.write('ls /\r');
terminal.write('Welcome to Aquarium!\n');

//console.log(shell.process);
