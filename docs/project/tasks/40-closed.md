---
title: "Completed tasks"
type: "task"
state: "closed"
sort: "newly completed at top"
---

### address duplicate DataWrapper
+ looks like Router is double-calling the Wrapper
    + it does
+ therefore the constructor is called twice
+ thankfully componentDidMount is only called once
    + that's where we're currently doing the loadData()
> ignore for now

### cook up some kind of exception handling and reporting [parent](/project/user-stories/user-can-view-a-thinkope)
+ throw exception on bad datasource
    + use generically defined ErrorBoundaries
        + don't worry about error overlay in dev (can 'X')
+ [X] fix test suite now exceptions being thrown
    + [RTL waitFor](https://testing-library.com/docs/guide-disappearance/)
    + [Enzyme createWaitForElement](https://www.npmjs.com/package/enzyme-wait)

### create simple DefaultEditor for / route
+ will eventually need some kind of file loader
    + organised by datasource
+ for now should just show simple text editor
    + lets users write something...

### set up @github datasource [parent](/project/user-stories/user-can-view-a-thinkope)
+ pre-bake credentials for URL
    + [base](https://api.github.com/)
+ add whitelist of query parameters
    + then pass on those params in the request
        + e.g. ref (for specifying the branch)

### research loading data from first source [parent](/project/user-stories/user-can-view-a-thinkope)
+ pass to Redux (internal state) on init
    + [draftJS how to init](https://stackoverflow.com/questions/35884112/draftjs-how-to-initiate-an-editor-with-content)
+ identify ingest location
    + really it's got nothing to do with the editors
    + it's central, the redux store/editored slice
    + but it's based on URL and we only parse that out in ViewWrapper
+ [X] stub out with simple hard-coded text
+ [X] fix "cannot update" bug
    + clicking dispatches event, but does not set caret
  > moved to single editorStateWrap around entire ViewWrapper
    + makes sense because we've got
        + a single redux store
        + single reducer
        + multiple views dispatching events
+ design load op
    + currently just loading text
        + need to load from a web service
        + suggest node express
            + serve app (built)
            + field requests
                + simple node file server [serve-static](http://expressjs.com/en/resources/middleware/serve-static.html)
    + local isn't obvious
        + but it's straight-forward for a developer's first-use experience
            + start thinkope/app, start local node express app, play with local files
        + probably want to make it align to the @github datasource operations
            + we can use rest calls directly into that
                + might be worth coding that first
                    + /repos/:owner/:repo/contents/:path
                        + [api request for metadata about file](https://api.github.com/repos/lightenna/thinkope/contents/README.md)
                            + includes download link for file
                        + [http link to file](https://raw.githubusercontent.com/lightenna/thinkope/develop/README.md)
                            + or API request 'github' link for base64-encoded content
                        + [github link](https://api.github.com/repos/lightenna/thinkope/git/blobs/ab936d52ff60645a99f9d97cf6687c2fda47444a)
      > do @github datasource first

### produce mock JSON data
+ static example to feed initial view development
    + will also help with testing

### test two editor views side-by-side [parent](/project/user-stories/user-can-view-a-thinkope)
+ sync works with two isolated EditorState objects

### embed editor view [parent](/project/user-stories/user-can-view-a-thinkope)
+ redux based
+ start with [DraftJS](https://draftjs.org/)
+ capture and propagate update
    + aim to push up to ViewWrapper and down to other views
        + including another DraftJS editor view
        + may better link them in the future, but maintain view independence for now
+ focus on the Redux implications of multiple DraftJS editors
    + get two DraftJS editors paired
        + such that typing in one appears in the other
+ [X] structure app properly
    + [X] set up simple reducer
    + understand features, reducers, actions, components
        + package reducers and actions in slices [ref](https://redux.js.org/tutorials/essentials/part-2-app-structure)
    + internal (Redux) store
        + JLOB
        + list of patches in order
            + all applied
        + think about patch life cycle
            + new
            + applied (to local working copy/Redux store)
            + committed (to local repo)
            + pushed (to remote)
+ [X] save editor text into the store
    + [ref](https://redux.js.org/tutorials/essentials/part-2-app-structure)
    + pass in editorState
        - current undefined
    + look at how others have integrated React, Redux and text editors
        + [Krispel-Samsel](https://reactrocket.com/post/draft-js-and-redux/)
        + [Karpov](https://thinkster.io/tutorials/react-redux-markdown-editor)
        + [Mahoney](https://medium.com/@siobhanpmahoney/building-a-rich-text-editor-with-react-and-draft-js-part-3-persisting-rich-text-data-to-server-b298540ba8d8)
    + try to store the unserializable state in Redux first
        + [even though it's the old way](https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using)
        + then we can work out how to do the next bit
            - turns out that's not the root of the EditorState undefined problem
    + look at [Redux Draft](https://github.com/gocreating/redux-draft)
        + [X] npm install and test
        + [X] sync edits (as whole-text) to store using reducer
            + internalise the code and refactor to make changes
        + [X] send edits (as whole-text) to another view
        + [X] address React 16.x warning
            + remove [legacy API](https://reactjs.org/docs/legacy-context.html)
            + could replace with Context API if needed in the future
                + new [context API](https://reactjs.org/docs/context.html)
+ [X] add a raw view
    + visualise the internal data structure as making editor changes
        + will make debugging easier
+ [X] store raw object (JLOB) in Redux, not editorState
    + need to store serializable objects
  > rethought, better to serialise whole editorState if possible
  + re-rethought, go back to independent editors
  + with only a synchronised rawState object between them
    + strip everything right back
        + put editorState in the EditorView, not in Redux
+ [X] sync two editors properly
    + using full editorState
    + [great article on updating editors in realtime](https://caffeinecoding.com/react-redux-draftjs/)
        + probably going to need to try a bunch of editors
    - looks like they won't sync with the same shared editorState object in redux
        + [multiple editors with multiple EditorState objects](https://github.com/draft-js-plugins/draft-js-plugins/blob/master/FAQ.md)
        + persevere with rawState object in Redux
+ [X] revert to using toolkit-configureStore()
    + instead of older createStore()
+ [X] recode editorSlice as a proper slice
+ [X] add TestEditor tests

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
    + ...[excellent 15 'best' list](https://ourcodeworld.com/articles/read/1065/top-15-best-rich-text-editor-components-wysiwyg-for-reactjs)
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

### create container view [parent](/project/user-stories/user-can-view-a-thinkope)
+ acceptance criteria
    + [X] contains nested 1 or more sub-views
    + [X] allows proportional screen splitting
    + [X] passes down URL-based view information to sub-views
    + supports SSR - delay for now
+ [X] pass view state into view as prop
    + sourced from URL
    + [test](http://localhost:3000/@something/two/three?view={"type":"fish","x":0.00002345,"y":0.000006789,"w":1.0,"h":0.05})
        + [X] add to unit tests
+ [X] process nested children
    + ViewWrapper pulls out the children
        + instantiates ViewWrappers for each of them
    + [test](http://localhost:3000/@something/two/three?view={"type":"container","orient":"horiz","split":35.0,"sub":[{"type":"fish"},{"type":"fish"}]})
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

### stop flash of 'Page not found' [parent](/project/user-stories/user-can-view-a-thinkope)

### migrate away from Slingshot [parent](/project/user-stories/user-can-view-a-thinkope)
+ too many issues with hot reloading
+ use create-react-app instead
`npx create-react-app my-app --template redux`
+ [X] make tests run
+ [X] rebuild webpack config
+ [X] deploy live

### create react-based SPA [parent](/project/user-stories/user-can-view-a-thinkope)
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

### create simple placeholder favicon [parent](/project/user-stories/user-can-view-a-thinkope)
+ [Th](https://favicon.io/favicon-generator/?t=Th&ff=ABeeZee&fs=70&fc=%23FFFFFF&b=rounded&bc=%23888)

### create index page for /tech
- cannot rely on web server (directory listing) index pages
    + fine when using jekyll locally
    - not when published
+ index or README?
    + index
    + the README is for GitHub.com, which already indexes fine for now
+ tech should use Thinkope too
    + [tech docs](/tech) is full of thinking
    + it's a less clear use-case than [project docs](/project) (fits easily with todo)
        + but it's exactly what we're trying to encourage

### evaluate lists on GitHub.com [parent](/project/user-stories/user-can-view-a-thinkope)
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

