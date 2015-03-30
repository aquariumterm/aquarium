Individual Reports
====================

WeiPing Allen Hsiao (allenh)
---------------------

- The most significant contribution that I have done to the team is that I created test scripts using ChaiAsPromised with Selenium to test the web framework as well as working with Ryan on the implementation of the sidebar with the help from Alex.
- During the implementation of Aquarium I learned various new technologies such as [Flux](https://facebook.github.io/flux/) framework for building the application and [Chai](http://chaijs.com/) for testing the web application. A few issues that I encountered during the process were all technical related issues such as setting up the development environment on different Linux distributions (Ubuntu and Linux Mint).
- I think that my main strength as a team member is the fact that I was able to work seamlessly with the team. For example during the process of implementing the application I worked closely with Ryan to implement the sidebar and [refactored his initial code to use the Flux architecture](https://github.com/UoT-CSC30x-W15/301W15-Prj-Team4-repo/commit/99bf4a9f9f4a43ff0a3a47682645728d7fe74d4c).
- The most hindering weakness that I had as a team member was the lack of knowledge in the Javascript libraries that we chose to work with. As a result of this I had to spend an extensive amount of time to read over documentations and tutorials before I could finally start developing the application.

Alexander Biggs (akbiggs)
---------------------

- My most significant contribution was the [implementation of the autocompletion feature](https://github.com/UoT-CSC30x-W15/301W15-Prj-Team4-repo/pull/24), which provides users with suggestions on commands they can use as they type. As the Flux architecture in our codebase had not been set up at this point, this required substantial research of existing examples and documentation to determine how the user's interaction with the terminal could be modelled with Flux's paradigms.
- I learned how to dive into existing codebases on GitHub, and to examine their issues and recent changes to the repositories when debugging why certain aspects of the project were not working. I also became comfortable developing features using Flux.
- My main strength as a team player is my ability to adapt to new technologies and workflows quickly, finding a way to ship features even when I am inexperienced.
- My main weakness as a team player is learning how to delegate and manage progress on features, to ensure that all the members of the team have equal opportunity to become experienced working in the codebase.

Kyle Zhou (kylemsguy)
---------------------

- My most significant contributions include writing a node.js program to combine, parse, and serialize a set of Markdown files into JSON (see commit [8f04c69](https://github.com/UoT-CSC30x-W15/301W15-Prj-Team4-repo/commit/8f04c696d20a6d5ebcec1414bcdd1c44215442d5). I also worked on the base term.js, figuring out how it worked and how it fit into our project, and did work debugging issues with Linux compatibility [#16](https://github.com/UoT-CSC30x-W15/301W15-Prj-Team4-repo/pull/16). 
- During the course of working on Aquarium, I learned about how different versions of bleeding-edge packages can break compatibility with each other, as well as techniques to resolve these issues. 
- Some of my strengths include strong problem solving skills when it comes to figuring out code written by others, and how to integrate the code into Aquarium. I was also very good at finding and fixing compatibility problems with different versions of Linux and Node.
- My main weakness was inexperience with the frameworks that we were using, which meant that I had to spend a lot of time learning and asking questions, which may have initially limited my contribution to the project. However, after familiarizing myself with the frameworks we were using, I was able to contribute adequately well to the project. 

Nicholas Goh (GohNicho)
---------------------

-
-
-
-

Peter Lu (pxlu)
---------------------

- My most significant contribution to the project was the design and implementation of the [base Terminal.js](https://github.com/UoT-CSC30x-W15/301W15-Prj-Team4-repo/pull/13) component, as well as the implmentation of the [parsed TL;DR pages](https://github.com/UoT-CSC30x-W15/301W15-Prj-Team4-repo/issues/29) for use in the sidebar component. 

- During our work on Aquarium, I've learned the importance of continual tests, as well as the difficulties in dealing with different version of software such as node-webkit. [#14](https://github.com/UoT-CSC30x-W15/301W15-Prj-Team4-repo/issues/14)

- My main strengths as a team member is my ability to spot mistakes or improvements of work done by others. During the implementation of [Terminal.js](https://github.com/UoT-CSC30x-W15/301W15-Prj-Team4-repo/pull/13), I successfully peer-reviewed code that wasn't working for some time, and after carefully reading through it, I was able to spot the error and helped correct the mistake to allow the team to move forward.

- My main weaknesses as a team member is a relative lack of knowledge with the technologies that we were mainly using, mainly node.js and the flux architecture. I should have studied how these technologies worked during the planning stages of our project, as my inexperiences slowed down the team in our implementation of certain features early on.
 

Ryan Fan (ryanfan)
---------------------

- My most significant individual contribution was to create the sidebar.  Originally, it was able to show and hide itself with a keyboard macro, but the group decided as a whole that it would no longer be required.  I was also responsible for styling the sidebar into a format that is easy for the users to read.  I had to touch up on my CSS as well as get used to how React handles their styling.

- A new technology that I learned while working on this project. Flux, which is a web development framework.  It consists of dispatcher, stores and views, and this allows the code to be easily modularized.  Because of this, it is easy to extend code and keep code independent from each other. 

- In my opinion, my main strength as a team member, I can manage time well so that I will minimalize slowing down the team.  I know that I am not the best programmer in the world, but I am still able to find extra time to do work on the project.  Because it takes me a long time to do what others think is an "easy job" or a "quick fix", I need to keep in mind the time I allocate for such tasks.

- In my opinion, my main weakness as a team member is my weaker technical skills.  I could not think I would be able to learn so many things in such a short amount of time without proper mentoring from other team members.  For future projects, spending some more time preparing on how to use the technologies will definitely help and make the amount of time needed shorter too.

Spencer Elliott (elliottsj)
---------------------

- My most significant contribution was to configure and integrate the build system and application architecture, including:
  - Configuration of npm dependencies, and building [pty.js][] native addons for [nw.js][]
  - Configuration of [Grunt](http://gruntjs.com/) to automate code style checking via [ESLint](http://eslint.org/), testing via [Selenium](http://www.seleniumhq.org/), and building native binaries for Linux and OS X.
  - Bootstrapping [React][] onto the [nw.js][] app with ES6 + JSX compilation via [babel](https://babeljs.io/).
- An issue I experienced was dealing with [cyclical dependencies in node.js modules](https://nodejs.org/api/modules.html#modules_cycles). I found that it was not possible for two stores to depend on each other using our current architecture, since each store is instantiated upon being `import`ed. Specifically, I wanted `ShellStore` to depend on the result of `AutoCompleteStore` to continue passing data into the host shell, but `AutoCompleteStore` already depended on `ShellStore` to write data directly to the shell. A possible solution would be to extract `ShellStore`'s [pty.js][] instance to another module and include that module in both `ShellStore` and `AutoCompleteStore`, but I instead ended up [refactoring the `Terminal` component to be in charge of calling different actions depending on which key was pressed](https://github.com/UoT-CSC30x-W15/301W15-Prj-Team4-repo/commit/2ff2078cc23d6192d386e955587c4e4ee99cf241#diff-647535f01552daaf415326a7584b136dR111).
- My main strength is technical skill: having a small amount of experience with Node.js in the past and spending a significant amount of time researching and learning how to use [nw.js][], [React][] and [Flux][] allowed me to have a clear understanding of our application structure and architecture, and allowed me to lead in the technical decisions of the application.
- I should improve by documenting code earlier and more often; teammates will be able to integrate with my code more easily when they can understand it faster.

[pty.js]: https://github.com/chjj/pty.js
[nw.js]: https://github.com/nwjs/nw.js
[react]: https://facebook.github.io/react/
[flux]: https://facebook.github.io/flux/
