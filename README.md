Aquarium
========

A terminal emulator with enhanced auto-complete, and built-in documentation and tutorials.
Supports _bash_, _zsh_, _fish_.

## Development

#### NOTE:

* Tested on OS X 10.10
* Tested on Linux Ubuntu distribution version 14.04LTS and Arch Linux
* Does NOT work on Debian 7 "Wheezy" (glibc < 2.15)

Dependencies:

* Node ~v0.12.0 ([nvm](https://github.com/creationix/nvm) recommended):
    ```shell
    # Linux Mint:
    sudo apt-get install curl build-essential
    curl https://raw.githubusercontent.com/creationix/nvm/v0.23.3/install.sh | bash
    echo "source $HOME/.nvm/nvm.sh" > ~/.bashrc
    source ~/.bashrc
    nvm install 0.12.1
    ```

* _Note_: For Linux (Ubuntu/Mint), you must symlink `libudev.so.0`:

    ```shell
    sudo ln -s /lib/x86_64-linux-gnu/libudev.so.1 /lib/x86_64-linux-gnu/libudev.so.0
    ```

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

    This will launch the nw.js desktop app.

