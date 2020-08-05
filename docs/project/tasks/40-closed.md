---
title: "Completed tasks"
type: "task"
state: "closed"
---

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

