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

* Node ~v0.10.35
  - OS X: Use [Homebrew](http://brew.sh/): `brew update && brew install node`
  - Linux: Use [Linuxbrew](https://github.com/Homebrew/linuxbrew): `brew update && brew install node`
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

### Branching strategy

We're following the
[feature branch workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow):

0. (If one doesn't exist) Create a new GitHub issue for your feature:

    <https://github.com/UoT-CSC30x-W15/301W15-Prj-Team4-repo/issues/new>

1. Create your feature branch, with name starting with `feature/`:

    ```shell
    git checkout -b feature/my-awesome-feature
    ```

2. Implement your feature, committing often, prepending your GitHub issue number:

    ```shell
    git add app/my-awesome-feature.js
    git commit -m '#1337 Add foobar compatibility'

    # For your first commit:
    git push -u origin feature/my-awesome-feature
    # For future commits:
    git push
    ```

3. Create a pull request on GitHub based on `master`:

    <https://github.com/UoT-CSC30x-W15/301W15-Prj-Team4-repo/compare/master...feature/my-awesome-feature>

4. Work with the team to review your code, making any necessary changes before merging.

5. A team member will merge your pull request into `master`.

##### Non-feature branches

We'll use the following naming convention for non-feature branches:

- `fix/`: Bug fixes
- `chore/`: Refactoring/improvements/general maintenance
