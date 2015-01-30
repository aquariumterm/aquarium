// Workaround; see <http://stackoverflow.com/questions/25402492/nw-reactjs-requring-in-multiple-files-does-not-work>
global.document = window.document;
global.navigator = window.navigator;

var React = require('react');
console.log(React);
