Aquarium
========

A terminal emulator with enhanced auto-complete, and built-in documentation and tutorials.

## Phase 1

[Google Doc](https://docs.google.com/a/elliottsj.com/document/d/1HZ4h6swJqrk_00HHjmtdXOsPP-hKEZCTttgK40Uk37E)

## Development

_NOTE: This has only been tested on OS X 10.10_

Dependencies:

- Node ~v0.10.35
  - OS X: Use [Homebrew](http://brew.sh/): `brew update && brew install node`
  - Linux: Try [Linuxbrew](https://github.com/Homebrew/linuxbrew): `brew update && brew install node`
  - Windows: No.

1. Install the [Grunt](http://gruntjs.com/) CLI:

    ```shell
    npm install -g grunt-cli
    ```

2. Install npm dependencies:

    ```shell
    cd 301W15-Prj-Team4-repo/
    npm install
    ```

3. Start the debug build:

    ```shell
    grunt debug
    ```

    This will launch the nw.js desktop app and watch for changes to source files, live-reloading the nw.js app.
