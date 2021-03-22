---
title: "Completed tasks"
type: "task"
state: "closed"
sort: "newly completed at top"
---

### think about Editor synchronisation (local and remote)
+ only difference between the two is latency
+ draft-js does at least have a model for dealing with this
    + [race conditions in Draft](https://draftjs.org/docs/advanced-topics-editorstate-race-conditions)
+ want to be able to accommodate updates from all type of view.
    + They can be nice elegant fast updates (native THUDS)
    + pretty damn quick (translation from Draft.js on an update-by-update basis)
    + or horribly slow complete reflowing (Prosemirror)
        + should draw a line through Prosemirror because it can't be updated with deltas
        + Then again, I don't have any evidence that Draft.js can either
            + The serialised raw data structure isn't the internal native one
            + but it's immutable
                + so the editorState can and should move from one editorState to a completely new editorState on each keypress, then render
        + `handlePastedText` may be a way to do it
    + keeping non-Draft editors in the running helps ensure a better more flexible data-model
        + though it's likely the first implementation will be for the _easiest_ editor (probably Draft at this stage)

### debug integration between value-based and editorState-based views
* still only proof-of-concept, but better integration informs THUDS design
* [x] fix missing content bug
    * ORME view doesn't show all the sub-bullets
    * ORME parser is a problem
        * doesn't like bulletted lists where some (but not all) elements have a tick box
    * It's sort of ruling ORME out of contention
        * because we'll need to do a lot of work to parse out the incompatible bits
    * Fundamental problem with these editors
        * .md -> editor -> .md is currently a destructive op
            * that's not acceptable
        * Need to process text without destroying the things that don't meet the format
* [x] ORME typing bug
    * values are written back to ORME view
        * which sets the caret in the wrong place
* [x] add time delay on updating the ORME view
    * when typing in ED, text changes are written to ORME instantly
> re-visit editor model before getting into specific integration exercises

### think about chat/video-sharing between thinkers
+ eval [WebRTC](https://github.com/jakub-leszczynski/video-calling-app-example) for peer-to-peer video
    + [latency for WebRTC](https://flashphoner.com/oh-webcam-online-broadcasting-latency-thou-art-a-heartless-bitch/)
    + security of WebRTC, [excellent mechanics post](https://blog.sessionstack.com/how-javascript-works-webrtc-and-the-mechanics-of-peer-to-peer-connectivity-87cc56c1d0ab)
+ don't ping a list of local servers to find a nearby one
    + hopefully all traffic is direct peer-to-peer
    + once the connection has been brokered by the server
        + a single, or just a few TURN servers are required as a fallback
+ create Video chat view POC
    + experiment with latency
    + latency seems quite high even over a LAN connection
        + maybe better [audio-only](https://webrtc.github.io/samples/src/content/peerconnection/audio/)
        + investigate [WebRTC data channels](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Simple_RTCDataChannel_sample)
    + results are consistent on both tested connections for [WebRTC test](https://github.com/webrtc/testrtc)
        + TURN servers handle NAT'd peer connections
            + but can't go directly, i.e. have to be brokered by TURN server
+ could create an on-page timecode app
    + transmit it to the remote end
    + display received timecode and local timecode alongside one another
        + chart diff
    + could send via some kind of centralised update server
        + that'll be needed for real-time doc change sync
    + most significant updates are distributed through git
        + versioned accordingly
        + sync handles inter-commit changes
            + real-time does not completely hide us from conflict issues

### load content across all views
* currently only loading into Draft.js (JLOB) views (markdownEditor and test)

### create markdown editor [parent](/project/user-stories/user-can-view-a-thinkope)
* [Draft.js](https://github.com/facebook/draft-js) - for editor view
    * Can embed multiple editors from the [awesome gallery](https://github.com/nikgraf/awesome-draft-js)
* three views
    * DefaultEditor
        * sees raw text
    * MarkdownEditor
        * sees nicely rendered Markdown-as-HTML
        * lots of formatting buttons
    * TestEditor
        * raw view of EditorState
* unclear how different packages are going to treat the underlying editorState
    * try a couple of editors and a couple of plugins
        * may need to adapt the underlying editorState to be visual
            * i.e. covert markdown to contentState first
        * that too will affect how other views parse the data
        * also has downstream implications for edit > parse > write-back
            * what content gets affected (semantic change)
            * what syntax gets affected (syntactical change)
            * how do we handle notifications of the different changes
    * integrating the editors/plugins will inform that data architecture change
* [X] integrate Editor [Mulesoft's Markdown draft.js](https://www.npmjs.com/package/md-draft-js)
    * looks like the open source repo has been pulled
    * but it's still available in NPM, MIT licence
    * out-of-date
        * key functions are not implemented
            * `editorState.getCurrentContent` and `editorState.getSelection`
* [X] integrate Editor [Draftail](https://www.draftail.org/)
    * not real updates since 2019
    * built against draft 0.10.5
        * 0.10.5 build throws error
        * no `EditorState.createWithText` function
    * 0.11.x branch incomplete and no progress since May 2019
        * doesn't run
* evaluate plugins first because we need an editor component that can
    * accept markdown when typed in
    * accept markdown using WYSIWYG buttons
    * accept a block of markdown when pasted in
* [x] integrate Plugin [Fluent Markdown Plugin](https://github.com/makeflow/draft-js-fluent-markdown-plugin)
    * seems older (0.10.5), ignore for now
* [X] integrate Plugin [Markdown Shortcuts Plugin](https://github.com/ngs/draft-js-markdown-shortcuts-plugin)
    * could use [withspectrum branch](https://github.com/withspectrum/draft-js-markdown-plugin) but seems older
    * ngs is linked from a pretty [authoritative plugins list](https://github.com/draft-js-plugins/draft-js-plugins)
        * after installing missing peer dependencies, it seems to work
* would need to evaluate converters
    * try a forwards-backwards parse to see impact on Markdown
    * whole approach is very bitty
        * need something more comprehensively implemented
* consider alternatives
    * Read-only views
        * [React Markdown Preview](https://uiwjs.github.io/react-markdown-preview/)
            * would work for read-only views, but not inline editing
            * want something WYSIWYG
        * [React MD Editor](https://uiwjs.github.io/react-md-editor/)
            * nice side-by-side, but again read only
            * _almost_ all views should be editable
                * that's complicated to implement, but intuitive for users
                * we can deal with truncations etc.
                    * so long as nothing is lost
                    * so long as everything is undoable
    * Unsuitable
        * [React Quill](https://github.com/zenoamaro/react-quill)
            - nice but no markdown
    * Editors
        * [Sturmer's React RTE](https://github.com/sstur/react-rte)
            * draft.js based
            - not much progress in the last 2 years
                - README.md not really updated since 2016
        * [Puri's React Draft Wysiwyg](https://github.com/jpuri/react-draft-wysiwyg)
            - not much activity in the last year
        * [Outline's Rich Markdown Editor](https://github.com/outline/rich-markdown-editor)
            * lots of activity in recent weeks
                * this repo is in active development for [Outline](https://getoutline.com)
            * nice [online demo](https://codesandbox.io/s/qv10xzjw9j?file=/src/index.js)
                * works well enough on **bold**, _italic_ case
                * hoverbar is beautiful
* integrate Outline RME as best candidate
    * learn about non-Draft options (e.g. Prosemirror)
        * interested in its internal and exported data structure
            * similarity: how quickly can we convert from Prosemirror -> THUDS
            * pokeability: how quickly can we sync new changes to some part of that structure
            * jankiness: how quickly can we update the interface when some small part changes
    * need to look at the internal data structure
        * requirement: simple enough that we trust all editors to edit it ACIDically
    - not Draft.js
    * not clear cut at this stage
    * [X] integrate ORME from the ground up
        * don't worry about compatibility
        * integration will inform internal data structure choices (THUDS)
            * and the relationship with existing established data structures (like Draft's editorState)
        * naturally crosses left to right (ORME to Draft-js-Markdown-Editor)
            * sourced from Prosemirror (PM)
            * currently re-rendering the Draft JLOB every change
                * would be nice to merge into that
                * might be able to do that as a diff
                    * will create fast-update and slow-update sets of editors
                        * got to be able to justify it as the most important next step
                        * could delay optimisation for now
                            * just use whole text replacements every time
                            * that's going to create a lot of repainting
                    * delay for now
                        * we've got some editors that won't accept diffs
                        * so we _have_ to manage them anyway
                            * re-rendering everything with delays is good _enough_ for now
                            * it will require and can be optimised later
            * the tricky bit is the TH unified data structure (THUDS) design
                * that's the bit that's harder to delay until later
                    * fundamentally we either want to store plain text
                    * or some kind of line-by-line block structure (THUDS JBOB or or Draft's JLOB)
* goal is to write-back PM changes to THUDS and then out to value
    * [X] understand why PM changes are making it to Draft's JLOB right now
        * look at editorStateWrap
            - we're not using valueWrap at all
        * could single wrap for everything
            * so all editors get the same set of things
                * value (raw text)
                * editorState (draft)
                * THUDS
        * could have individual wraps for everything
            * they are broadly dispatching the same set of actions
            * but their internal structures are different
                * so identical actions may use different data
        * aim for different wrappers
            * so the DataWrapper will need to load multiple wrappers
                * that's tricky because at the moment the DataWrapper is wrapped by the editorStateWrap
        * a single wrapper is easier
            * [beautiful diagram](https://redux.js.org/tutorials/fundamentals/part-6-async-logic#redux-async-data-flow)
            * it can have different actions for the different editor types to use
            * creates a multiple dispatch problem,
                * solved with [action creators](https://redux.js.org/tutorials/fundamentals/part-7-standard-patterns#using-action-creators)
* take out of service the 'MarkdownEditor', now EditorMarkdownShortcuts
    * shortcuts are handy, but output isn't Markdown
        * it could be in the future, but for now let's stick to simple text
* double-dispatch to update both editorState and value

### apply focus to first 'focusable' view in container [parent](/project/user-stories/user-can-view-a-thinkope)
+ probably a depth-first search across all containers
    + until we find a focusable view
    + can always change out the search order later
+ just need to have the caret in an editor ready to type as soon as it's loaded
    + editor views are lazy loaded
        + that means we don't exactly know when to give them the caret
        + could store focus events centrally
            + that's probably a good idea anyway
    + view flagged as requesting caret
        + only requests the caret after it's loaded
        + caret drops in once loaded so long as no other view can requested it
+ working towards a proper selection model
    + want to show the same thing selected in multiple editors
        + will need to introduce virtual caret (line) and virtual selection (off-blue)
        + selecting in one makes something selected in the other
    + should also update URL state
        + selections can be serialised in the URL
            + they're part of each view state
        + maybe hashbang #L1-L6
            + maybe with character offsets #L1.13-L6.4
        + [github example](https://github.com/aderaaij/react-redux-github-api-example/blob/master/src/constants/ActionTypes.js#L1-L6)
    + clicking into an editor pane highlights it
        + virtual selections become real selections
        + that view then carries the "focus": true attribute
+ decided not to auto-apply focus
    + better to carry in URL
    + auto-apply is relatively trivial later
        + by parsing the URL state and identifying that nothing has the focus yet
+ [X] implement focus:true attribute
  > focus gets applied to view that has focus:true attribute set

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

### create first view [parent](/project/user-stories/user-can-view-a-thinkope)
+ is a React component
+ simple view
+ takes JSON data and renders to DOM

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

