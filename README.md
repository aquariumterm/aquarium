Aquarium
========

A terminal emulator with enhanced auto-complete, and built-in documentation and tutorials.

## Phase 1

[Google Doc](https://docs.google.com/a/elliottsj.com/document/d/1HZ4h6swJqrk_00HHjmtdXOsPP-hKEZCTttgK40Uk37E)

## Development

#### NOTE:

* Tested on OS X 10.10
* Tested on Linux Ubuntu distribution version 14.04 through Oracle Virtualbox

Dependencies:

* Node ~v0.10.36 ([nvm](https://github.com/creationix/nvm) recommended):
    ```shell
    # Linux Mint:
    sudo apt-get install curl build-essential
    curl https://raw.githubusercontent.com/creationix/nvm/v0.23.3/install.sh | bash
    echo "export NVM_DIR=\"/home/spencer/.nvm\"\n[ -s "$NVM_DIR/nvm.sh" ] && . \"$NVM_DIR/nvm.sh\"  # This loads nvm" > ~/.bashrc
    source ~/.bashrc
    nvm install 0.10.36
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

    This will launch the nw.js desktop app and watch for changes to source files, live-reloading the nw.js app.

### Branching strategy

We're following the
[feature branch workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow):

1. (If one doesn't exist) Create a new GitHub issue for your feature/bug/other:

    <https://github.com/UoT-CSC30x-W15/301W15-Prj-Team4-repo/issues/new>

2. Create your feature branch, with name starting with `feature/`, (or `fix/` or `chore/`):

    ```shell
    git checkout -b feature/my-awesome-feature
    ```

3. Implement your feature, committing often:

    ```shell
    git add app/my-awesome-feature.js
    git commit -m 'Add foobar compatibility'

    # For your first commit:
    git push -u origin feature/my-awesome-feature
    # For future commits:
    git push
    ```

4. Create a pull request on GitHub based on `master`:

    <https://github.com/UoT-CSC30x-W15/301W15-Prj-Team4-repo/compare/master...feature/my-awesome-feature>

5. Work with the team to review your code, making any necessary changes before merging.

6. A team member will merge your pull request into `master`.

##### Non-feature branches

We'll use the following naming convention for non-feature branches:

- `fix/`: Bug fixes
- `chore/`: Refactoring/improvements/general maintenance
