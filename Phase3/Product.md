Aquarium is a beginner-friendly shell that exposes the terminal's power to the user through context-sensitive suggestions on available commands.

For our Minimum Viable Product, we chose to focus on two major features:

1. Auto-completing commands, which tracks the user's currently entered input and provides suggestions on possible candidates for what the user is typing. The user can then examine these suggestions, learn about commands that they were previously unaware of, and choose a command that best suits their purposes.
2. Searching documentation through a sidebar. When users are beginning to use the terminal, they do not know that their terminal already offers a powerful set of existing documentation on the commands of the terminal. With the sidebar, we expose this documentation through an intuitive interface.

When the user boots up the terminal for the first time, they are greeted with a regular terminal prompt. We anticipate two common reactions from the user:

1. The user, realizing that they can enter text into the prompt, types some characters and sees a suggestion that catches their interest. They select the suggestion, and the terminal executes the command, displaying some results.
2. The user, interested in finding out more about an existing command or available operations, goes to the sidebar and searches using a command name or the command's description. The user then finds information about the command that they are interested in, along with examples of usages of that command with clear descriptions.

Aquarium is also useful for power users. When typing `cd` into the prompt, the power user could see `caffeinate` listed as one of the intermediate suggestions. Curious, the user might look at the command, and see that `caffeinate` is used to prevent a system from sleeping. Now the user would know that they can stop their computer from going into sleep mode using the caffeinate command. Aquarium allows users to discover new commands, making it ideal for long-term use.

Here is an example of a standard session with Aquarium with a user who knows how to navigate the filesystem, but is unfamiliar with Git:

1. The user boots up the terminal, wanting to work on their newly assigned CSC301 assignment. One of their teammates has already created a Git repository for the assignment, and the user wants to clone the repository.
2. The user changes into the directory that they want to clone the repository into.
3. The user types `git` into the prompt, unsure what commands are available, and sees suggestions of existing commands, including `git clone: Clone an existing repository`.
4. The user thinks this is relevant, so they type `git clone` into the sidebar. They see `git clone {{REMOTE-REPOSITORY-LOCATION}}` under the suggestions. They go on to their Github repository online, find the URL of the repository and paste it into Aquarium after entering `git clone`.
5. This clones their existing repo. Now the user can work on the codebase, and Aquarium will provide suggestions for `git add`, `git commit` and `git push` when they are ready to upload their work.

Our next steps with the product are:

1. Improve the quality of results returned by searching, both for autocompletion and the sidebar, to match more closely on descriptions of what the command should do, not what the command is called. For example, if the user types `my files`, `ls` should be suggested as a possible candidate.
2. Add interactive tutorials that are integrated into the terminal, where the user can learn new workflows to become more productive within the shell.
3. Add a settings page where the user can enable and disable Aquarium features.

