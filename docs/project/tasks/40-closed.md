---
title: "Completed tasks"
type: "task"
state: "closed"
sort: "newly completed at top"
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
+ [X] route to simple mock pages
+ [X] test URL rewriting
    + symmetric with 404 handler that injects ?p= see [404.md](/docs/assets/404.md)
    + make app rewrite URL in history
        + remove ?p=/
    + [test URL](https://www.thinkope.com/app/?p=/fish/fowl)
+ [X] fix /app embedding
    + routes don't work when prefixed with /app
        + mock-up local /dist with parameterised basepath
+ [X] clear down dist folder before build

### create simple placeholder favicon [parent](user-story/user-can-view-a-thinkope)
+ [Th](https://favicon.io/favicon-generator/?t=Th&ff=ABeeZee&fs=70&fc=%23FFFFFF&b=rounded&bc=%23888)

### create index page for /tech
- cannot rely on web server (directory listing) index pages
    + fine when using jekyll locally
    - not when published
+ index or README?
    + index
    + the README is for GitHub.com, which already indexes fine for now
+ tech should use Thinkope too
    + /tech is full of thinking
    + it's a less clear use-case than /project (fits easily with todo)
        + but it's exactly what we're trying to encourage

### evaluate lists on GitHub.com [parent](user-story/user-can-view-a-thinkope)
+ [X] commit and push latest site
+ [X] establish what the default view looks like
+ [X] check README.md markdown section link ('Getting started')
    + otherwise try
[link reference](https://gist.github.com/asabaylus/3071099#gistcomment-3366191)

### enforce HTTPS on GitHub Pages

### create favicon.ico
+ install in /docs
    + try in nested alternative folder
        - no use, always requests from /favicon.ico

### select theme for microsite
+ suggest minimal mistakes (MM) again
    + known entity
+ [x] roll out MM
    + try to customise directory structure
        + like to make the pages appear more neatly on GitHub
        + the markdown does look OK
            + aim to keep the front matter short
+ maybe split off website from project
    + people checking it out aren't going to want to checkout the website too particularly
    + app deployment then has to span repos
        + but that's not the end of the world
        + can script it
    + project management docs don't have to span
        + can live only in thinkope-main not thinkope-website
        + means the website starts to focus more on the usage
            + whereas the tech evolution of the project in main
        + can manage them with thinkope app
+ single repo with remote theme
    + use remote theme
[remote themes in github pages](https://github.blog/2017-11-29-use-any-theme-with-github-pages/)
[remote theme use of MM](https://github.com/mmistakes/minimal-mistakes#remote-theme-method)
    + take the files from the starter
[MM github pages starter](https://github.com/mmistakes/mm-github-pages-starter)
+ [X] test locally
    + sort out bundler deps
        + [O] if they work, add to -iac
```
choco install ruby2.devkit
```
            + didn't work, so uninstalled and removed 'wdm' line from Gemfile
+ [X] get something up online
+ [x] rename _posts
    - hard wired
+ [X] rename _pages
    + nice to make them more intuitive

