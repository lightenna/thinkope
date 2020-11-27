---
title: "Completed tasks"
type: "task"
state: "closed"
sort: "newly completed at top"
---

### evaluate JLOL to JLOB
+ consider changing lines to blocks
    + consistent with Jupyter and Draft block-based format
```
{
    "cells": [],
    "nbformat": 4,
    "nbformat_minor": 2
}
```
    + [example of Jupyter notebook JSON](https://raw.githubusercontent.com/DB2-Samples/db2jupyter/master/Db2%20Jupyter%20Macros.ipynb)
+ don't get too caught up on the output syntax
    + let's put it through a translation layer
        + Internal state -> (serializer) e.g. simple text string/DraftJS editorState -> Views
        + Internal state -> (format translator) e.g. Markdown/Jupyter JSON -> Files
    + Each views has _partial_ coverage over internal state
    + Internal state has total coverage over 1 or more files

### look at editors for views [parent](task/embed-editor-view)
+ Beware that state updates could trigger a lot of re-rendering
+ Evaluate multiple editors
    + [DraftJS]() which is the basis for
        + [React RTE](https://github.com/sstur/react-rte)
    + [codemirror](https://codemirror.net/)
    + [Slate](https://docs.slatejs.org/)
    + [Quill](http://quilljs.com/)
    + [Prosemirror](https://prosemirror.net/)
+ probably want to allow them all as views
    + means pairing each back to a whole-state object stored in Redux
    + that's going to create re-rendering issues
+ that means creating a common editor format
    + keep it simple, lean on the text
        + all these editors ultimately edit text
        + the richer they get, the more annotations
            + just need to standardise the annotations
        + git's approach is a good guide
            + think about every edit as a diff
            + lines are affected
        + edit = diff
            + diff to work out what changed (the diff)
            + patch to apply change (diff) to unpatched code
                + will need to keep microversions
                + which means there needs to be some kind of authoritative source
                    + probably treat remote as authoritative source
                        + handle conflicts like git
        + use find and replace as a model
            + we're patching
    + nice not to lose the editor's native object
        + could maybe store that too
            + at least locally
        + updates to linked editors are made using a cascade
            + diff object (if available, else)
            + full object (if available, else)
            + diff text (if available, else)
            + full text
        - too editor-specific, will never scale
            + revert to underlying text
+ interesting model is NoteDB using by Google in [Gerrit](https://www.gerritcodereview.com/)
+ [X] understand what the data structure for a patch typically looks like
    + want to use a relatively standard patch format
+ maybe [JSONPatch](http://jsonpatch.com/)

### create container view [parent](user-story/user-can-view-a-thinkope)
+ acceptance criteria
    + [X] contains nested 1 or more sub-views
    + [X] allows proportional screen splitting
    + [X] passes down URL-based view information to sub-views
    + supports SSR - delay for now
+ [X] pass view state into view as prop
    + sourced from URL
    + [test](http://localhost:3000/@something/two/three?view={%22type%22:%22fish%22,%22x%22:0.00002345,%22y%22:0.000006789,%22w%22:1.0,%22h%22:0.05})
        + [X] add to unit tests
+ [X] process nested children
    + ViewWrapper pulls out the children
        + instantiates ViewWrappers for each of them
    + [test](http://localhost:3000/@something/two/three?view={%22type%22:%22container%22,%22orient%22:%22horiz%22,%22split%22:35.0,%22sub%22:[{%22type%22:%22fish%22},{%22type%22:%22fish%22}]})
        + [X] add to unit tests
+ [X] create container view
    + initially just a single a:b split
        + but do as an array to be forward looking
        + could change to a:b:c for a:b:c...y:z split in the future
+ [X] migrate tests back to Enzyme
    + need to get them all working
+ [X] split out tests for lazy-loaded components
    + just test them as isolated components
        + Enzyme doesn't cope well with trying to lazy-load them from the parent component
+ [X] instantiate editor view (lazy loaded)
    + set up Enzyme test
    + leave editor blank for now
+ [X] refactor views to require data rather than datasource/path

### fix missing manifest.json for packaged docsapp

### stop flash of 'Page not found' [parent](user-story/user-can-view-a-thinkope)

### migrate away from Slingshot [parent](user-story/user-can-view-a-thinkope)
+ too many issues with hot reloading
+ use create-react-app instead
`npx create-react-app my-app --template redux`
+ [X] make tests run
+ [X] rebuild webpack config
+ [X] deploy live

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

