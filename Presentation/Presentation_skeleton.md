NOTE: Anything marked with *S* is for the SPEAKER to cover, and *N* for the NAVIGATOR

## Introduction

- *S*: Our product currently works on Mac OS X, and on most debian-based Linux distros such as Linux Mint, and several RPM-based Linux distros such as Fedora
	- *N*: Display the readme I guess...?
- *S*: Product is executable by using `grunt debug`
 	- *N*: Probably still the readme...
- *S*: This sprint was largely focused on TOOLING for ease of development, with basic functionality. Additional features slated for next sprint.

## Basic Functionality

- *S*: Our terminal runs on Term.js, a Javascript library that produces a terminal emulator. Has all basic functions implemented and working
	- *N* Run various commands in the background (ls, mkdir, cd, pwd, ls -l, htop(?))
- *S*: Term.js interacts with Pty.js to interact with ther user's native shell and file system
	- *S*: Any changes you make here will be mirrored on the local file system
	- *N*: mkdir/touch and navigate to the new file/dir using the native file browser
- *S*: Because Term.js uses pty.js to access the native terminal, it will run using whatever the user already has pre-installed. 
	- *S*: For beginner it's recommended to use FISH, but currently also confirmed to work perfectly with bash and zsh

## Tooling

- *S*: To run our application, we use a gruntfile to not only run the application but also for various tasks
	- *N*: Open the gruntfile in a text editor
- *S*: The first task that our gruntfile is responsible for is running shellnw which is responsible for running our application
	- *S*: This basically runs our node application using the `npm start` command
	- *N*: Navigate towards the top of the gruntfile
- *S*: Also contained in our gruntfile, we have begun development of our `watch` function that currently tracks certain files and detects change during development
	- *S*: Also should live-reload when changes detected but not functional as of yet
	- *N*: Show off more of the gruntfile...?
	- *S*: Live-reload is designed such that we can update files and view the changes without constantly restarting our application.
	- *S*: Gruntfile also contains JSLint which is a Javascript style checker that run on compile
- *S*: Work has been made on creating automated testing for our application
	- *S*: Testing uses Selenium web testing
	- *N*: Navigate to `run_test.sh` and run it...?
	- *S*: Currently consists of two tests: One to test that it runs correctly, the second test checks the basic touch function
- *S*: The run test also downloads any dependencies missing based on operating system
- *S*: Testing has also been setup in such a way that it can be easily extended for further tests

## Features

NOTE: I HAVE NO IDEA HOW THE NAVIGATOR CAN SHOW OFF THIS STUFF... MAYBE WE SHOULD MERGE AUTOCOMPLETE/SIDEBAR BRANCH TO SHOW IT OFF? OTHERWISE CHECKING OUT...?

- *S*: Currently there are several features being developed in side branches of the git repo
- *S*: We are developing an augmented interface using React.js, a Javascript library for developing individual UI components
- *S*: In feature/sidebar we currently have a prototype of the sidebar in place with placeholder information for individual entries
	- *S*: This can be extended later as each entry inherits from properties which can be parsed from tl-dr pages
	- *S*: This branch will also be used later for laying out other UI elementes such as the various tabs used to call up the sidebar
	- *S*: An abbreviated and simiplified version on man pages has been found and actually has a node API(?) that we can use to source our sidebar documentation
- *S*: We also have an auto-complete branch that currently has basic functionality AND I DON'T NO MUCH ELSE ABOUT IT. ALEX PLEASE HALP :D 


