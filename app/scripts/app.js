// Workaround; see <http://stackoverflow.com/questions/25402492/nw-reactjs-requring-in-multiple-files-does-not-work>
global.document = window.document;
global.navigator = window.navigator;

var React = require('react');
console.log(React);

var term = pty.spawn('bash', [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env
});

term.on('data', function(data) {
    document.getElementById("term_output").innerHTML = data;
});

process.stdin.on('readable', function() {
    var chunk = process.stdin.read();
    if (chunk !== null) {
        term.write(chunk);
    }
});

process.stdin.on('end', function() {
    process.stdout.write('end');
});

