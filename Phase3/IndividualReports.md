Individual Reports
====================

Allen Hsiao (allenh)
---------------------

-
-
-
-

Alexander Biggs (akbiggs)
---------------------

-
-
-
-

Kyle Zhou (kylemsguy)
---------------------

-
-
-
-

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
