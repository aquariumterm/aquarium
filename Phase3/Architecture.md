# Architecture

Aquarium uses [Facebook's Flux architecture](https://facebook.github.io/flux/docs/overview.html) 
to model data flow and user interactions throughout the application:

![Flux diagram](http://i.imgur.com/ccDuA5q.png)

We are using the following components as part of this Flux architecture:

### Dispatcher

- [AppDispatcher.js](https://github.com/UoT-CSC30x-W15/301W15-Prj-Team4-repo/blob/master/app/js/dispatchers/AppDispatcher.js): an instance of the `Dispatcher` provided by [flux](https://github.com/facebook/flux).

### Actions

- [WindowActions.js](https://github.com/UoT-CSC30x-W15/301W15-Prj-Team4-repo/blob/master/app/js/actions/WindowActions.js): actions to manipulate window properties (e.g. size)
- [TerminalActions.js](https://github.com/UoT-CSC30x-W15/301W15-Prj-Team4-repo/blob/master/app/js/actions/TerminalActions.js): actions to send and receive data from the terminal
- [AutoCompleteActions.js](https://github.com/UoT-CSC30x-W15/301W15-Prj-Team4-repo/blob/master/app/js/actions/AutoCompleteActions.js): actions to navigate and select autocomplete suggestions
- [SidebarActions.js](https://github.com/UoT-CSC30x-W15/301W15-Prj-Team4-repo/blob/master/app/js/actions/SidebarActions.js): actions to query documentation

### Stores

- [WindowStore.js](https://github.com/UoT-CSC30x-W15/301W15-Prj-Team4-repo/blob/master/app/js/stores/WindowStore.js): state related to window properties (e.g. size)
- [TerminalStore.js](https://github.com/UoT-CSC30x-W15/301W15-Prj-Team4-repo/blob/master/app/js/stores/WindowStore.TerminalStore): contains [term.js](https://github.com/chjj/term.js) instance and keeps track of terminal size
- [AutoCompleteStore.js](https://github.com/UoT-CSC30x-W15/301W15-Prj-Team4-repo/blob/master/app/js/stores/AutoCompleteStore.js): keeps track of entered commands and generates autocomplete suggestions
- [SidebarStore.js](https://github.com/UoT-CSC30x-W15/301W15-Prj-Team4-repo/blob/master/app/js/stores/SidebarStore.js): keeps track of documentation searches
- [ShellStore.js](https://github.com/UoT-CSC30x-W15/301W15-Prj-Team4-repo/blob/master/app/js/stores/ShellStore.js): contains [pty.js](https://github.com/chjj/pty.js) instance to interact with the host's shell, dispatches `receiveOutput` upon output from the shell, and provides an interface to write to the shell
- [CommandStore.js](https://github.com/UoT-CSC30x-W15/301W15-Prj-Team4-repo/blob/master/app/js/stores/CommandStore.js): stores the set of commands used for autocomplete & documentation

### Views

- [Terminal.jsx](https://github.com/UoT-CSC30x-W15/301W15-Prj-Team4-repo/blob/master/app/js/components/Terminal.jsx): displays the terminal emulator and autocomplete suggestions
- [Sidebar.jsx](https://github.com/UoT-CSC30x-W15/301W15-Prj-Team4-repo/blob/master/app/js/components/Sidebar.jsx): displays the documentation sidebar

See diagram below:

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓   
┃                                          Actions                                           ┃   
┃                                                                                            ┃   
┃        Window                 Terminal             AutoComplete              Sidebar       ┃   
┃ ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐ ┃   
┃ │   resizeWindow    │  │  attachTerminal   │  │    selectPrev     │  │searchDocumentation│ ┃   
┃ └───────────────────┘  └───────────────────┘  └───────────────────┘  └───────────────────┘ ┃   
┃                        ┌───────────────────┐  ┌───────────────────┐                        ┃◀─┐
┃                        │      typeKey      │  │    selectNext     │                        ┃  │
┃                        └───────────────────┘  └───────────────────┘                        ┃  │
┃                        ┌───────────────────┐  ┌───────────────────┐                        ┃  │
┃                        │   receiveOutput   │  │ confirmSuggestion │                        ┃  │
┃                        └───────────────────┘  └───────────────────┘                        ┃  │
┃                                                                                            ┃  │
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
                                               │                                                │
                                               │                                                │
                                               ▼                                                │
                                    ┏━━━━━━━━━━━━━━━━━━━━━┓                                     │
                                    ┃                     ┃                                     │
                                    ┃                     ┃                                     │
                                    ┃    AppDispatcher    ┃                                     │
                                    ┃                     ┃                                     │
                                    ┃                     ┃                                     │
                                    ┗━━━━━━━━━━━━━━━━━━━━━┛                                     │
                                               │                                                │
                                               │                                                │
                                               ▼                                                │
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
┃                                           Stores                                           ┃  │
┃                                                                                            ┃  │
┃ ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐ ┃  │
┃ │Window             │  │Terminal           │  │AutoComplete       │  │Sidebar            │ ┃  │
┃ │                   │  │                   │  │                   │  │                   │ ┃  │
┃ │* width            │  │* term             │  │* command          │  │* searchResults    │ ┃  │
┃ │* height           │  │* width            │  │* cursor           │  │                   │ ┃  │
┃ │                   │  │* height           │  │* suggestions      │  │                   │ ┃  │
┃ │                   │  │                   │  │* selectedIndex    │  │                   │ ┃  │
┃ └───────────────────┘  └───────────────────┘  └───────────────────┘  └───────────────────┘ ┃  │
┃ ┌───────────────────┐  ┌───────────────────┐                                               ┃  │
┃ │Shell              │  │Command            │                                               ┃  │
┃ │                   │  │                   │                                               ┃  │
┃ │* shell            │  │* commands         │                                               ┃  │
┃ │                   │  │                   │                                               ┃  │
┃ │                   │  │                   │                                               ┃  │
┃ │                   │  │                   │                                               ┃  │
┃ └───────────────────┘  └───────────────────┘                                               ┃  │
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
                                               │                                                │
                                               │                                                │
                                               ▼                                                │
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
┃                                       Views (React)                                        ┃  │
┃                                                                                            ┃  │
┃ ┌──────────────────────────────────────────┐  ┌──────────────────────────────────────────┐ ┃  │
┃ │Terminal         ┌──────────────────────┐ │  │Sidebar          ┌──────────────────────┐ │ ┃  │
┃ │                 │AutoCompleteSuggestion│ │  │                 │Entry                 │ │ ┃  │
┃ │* suggestions    │                      │ │  │* searchResults  │                      │ │ ┃  │
┃ │* selectedIndex  │* name                │ │  │                 │* name                │ │ ┃  │
┃ │                 │* description         │ │  │                 │* description         │ │ ┃  │
┃ │                 │* isSelected          │ │  │                 │* examples            │ │ ┃──┘
┃ │                 └──────────────────────┘ │  │                 │ ┌───────────────┐    │ │ ┃   
┃ └──────────────────────────────────────────┘  │                 │ │EntryExample   │    │ │ ┃   
┃                                               │                 │ │               │    │ │ ┃   
┃                                               │                 │ │* code         │    │ │ ┃   
┃                                               │                 │ │* description  │    │ │ ┃   
┃                                               │                 │ └───────────────┘    │ │ ┃   
┃                                               │                 └──────────────────────┘ │ ┃   
┃                                               └──────────────────────────────────────────┘ ┃   
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```
