---
title: "To do list"
type: "task"
state: "active"
---

### create react-based SPA [parent](user-story/user-can-view-a-thinkope)
+ [X] start with React Router
[SPA ref](https://github.com/rafgraph/spa-github-pages)
    + [X] set up 404 redirection as part of integrated microsite
        + keeps app source relatively clean
+ [X] select react+redux boilerplate
+ [X] create simple boilerplate app source
    + using [Slingshot](https://github.com/coryhouse/react-slingshot)
+ [X] build
+ [ ] test URL rewriting
    + symmetric with 404 handler that injects ?p= see [404.md](/docs/assets/404.md)
    + make app rewrite URL in history
        + remove ?p=/
    + [test URL](https://www.thinkope.com/app/?p=/fish/fowl)

### create container view [parent](user-story/user-can-view-a-thinkope)
+ acceptance criteria
    + contains nested 1 or more sub-views
    + allows proportional screen splitting
    + supports SSR
    + passes down URL-based view information to sub-views

### think about internal data structure
+ see /tech
