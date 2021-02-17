---
title: "To do list"
type: "task"
state: "active"
---

### create markdown editor [parent](/project/user-stories/user-can-view-a-thinkope)
+ [Draft.js](https://github.com/facebook/draft-js) - for editor view
    + Can embed multiple editors from the [awesome gallery](https://github.com/nikgraf/awesome-draft-js)
+ three views
    + DefaultEditor
        + sees raw text
    + MarkdownEditor
        + sees nicely rendered Markdown-as-HTML
        + lots of formatting buttons
    + TestEditor
        + raw view of EditorState
+ unclear how different packages are going to treat the underlying editorState
    + try a couple of editors and a couple of plugins
        + may need to adapt the underlying editorState to be visual
            + i.e. covert markdown to contentState first
        + that too will affect how other views parse the data
        + also has downstream implications for edit > parse > write-back
            + what content gets affected (semantic change)
            + what syntax gets affected (syntactical change)
            + how do we handle notifications of the different changes
    + integrating the editors/plugins will inform that data architecture change
+ [X] integrate Editor [Mulesoft's Markdown draft.js](https://www.npmjs.com/package/md-draft-js)
    + looks like the open source repo has been pulled
    + but it's still available in NPM, MIT licence
    + out-of-date
        + key functions are not implemented
            + `editorState.getCurrentContent` and `editorState.getSelection`
+ [X] integrate Editor [Draftail](https://www.draftail.org/)
    + not real updates since 2019
    + built against draft 0.10.5
        + 0.10.5 build throws error
        + no `EditorState.createWithText` function
    + 0.11.x branch incomplete and no progress since May 2019
        + doesn't run
+ evaluate plugins first because we need an editor component that can
    + accept markdown when typed in
    + accept markdown using WYSIWYG buttons
    + accept a block of markdown when pasted in
+ [x] integrate Plugin [Fluent Markdown Plugin](https://github.com/makeflow/draft-js-fluent-markdown-plugin)
    + seems older (0.10.5), ignore for now
+ [X] integrate Plugin [Markdown Shortcuts Plugin](https://github.com/ngs/draft-js-markdown-shortcuts-plugin)
    + could use [withspectrum branch](https://github.com/withspectrum/draft-js-markdown-plugin) but seems older
    + ngs is linked from a pretty [authoritative plugins list](https://github.com/draft-js-plugins/draft-js-plugins)
        + after installing missing peer dependencies, it seems to work
+ would need to evaluate converters
    + try a forwards-backwards parse to see impact on Markdown
    + whole approach is very bitty
        + need something more comprehensively implemented
+ consider alternatives
    + Read-only views
        + [React Markdown Preview](https://uiwjs.github.io/react-markdown-preview/)
            + would work for read-only views, but not inline editing
            + want something WYSIWYG
        + [React MD Editor](https://uiwjs.github.io/react-md-editor/)
            + nice side-by-side, but again read only
            + _almost_ all views should be editable
                + that's complicated to implement, but intuitive for users
                + we can deal with truncations etc.
                    + so long as nothing is lost
                    + so long as everything is undoable
    + Unsuitable
        + [React Quill](https://github.com/zenoamaro/react-quill)
          - nice but no markdown
    + Editors
        + [Sturmer's React RTE](https://github.com/sstur/react-rte)
            + draft.js based
            - not much progress in the last 2 years
                - README.md not really updated since 2016
        + [Puri's React Draft Wysiwyg](https://github.com/jpuri/react-draft-wysiwyg)
            - not much activity in the last year
        + [Outline's Rich Markdown Editor](https://github.com/outline/rich-markdown-editor)
            + lots of activity in recent weeks
                + this repo is in active development for [Outline](https://getoutline.com)
            + nice [online demo](https://codesandbox.io/s/qv10xzjw9j?file=/src/index.js)
                + works well enough on **bold**, _italic_ case
                + hoverbar is beautiful
+ integrate Outline RME as best candidate
    + learn about non-Draft options (e.g. Prosemirror)
        + interested in its internal and exported data structure
            + similarity: how quickly can we convert from Prosemirror -> THUDS
            + pokeability: how quickly can we sync new changes to some part of that structure
            + jankiness: how quickly can we update the interface when some small part changes
    + need to look at the internal data structure
        + requirement: simple enough that we trust all editors to edit it ACIDically
    - not Draft.js
    + not clear cut at this stage
    + [X] integrate ORME from the ground up
        + don't worry about compatibility
        + integration will inform internal data structure choices (THUDS)
            + and the relationship with existing established data structures (like Draft's editorState)
        + naturally crosses left to right (ORME to Draft-js-Markdown-Editor)
            + sourced from Prosemirror (PM)
            + currently re-rendering the Draft JLOB every change
                + would be nice to merge into that
                + might be able to do that as a diff
                    + will create fast-update and slow-update sets of editors
                        + got to be able to justify it as the most important next step
                        + could delay optimisation for now
                            + just use whole text replacements every time
                            + that's going to create a lot of repainting
                    + delay for now
                        + we've got some editors that won't accept diffs
                        + so we _have_ to manage them anyway
                            + re-rendering everything with delays is good _enough_ for now
                            + it will require and can be optimised later
            + the tricky bit is the TH unified data structure (THUDS) design
                + that's the bit that's harder to delay until later
                    + fundamentally we either want to store plain text
                    + or some kind of line-by-line block structure (THUDS JBOB or or Draft's JLOB) 
+ goal is to write-back PM changes to THUDS and then out to value
    + [ ] understand why PM changes are making it to Draft's JLOB right now

### load content across all views
+ currently only loading into Draft.js (JLOB) views (markdownEditor and test)

### add line numbers to default (draft) markdown text editor
+ [Gist](https://gist.github.com/lixiaoyan/79b5740f213b8526d967682f6cd329c0)
+ [Gutter example](http://seejamescode.github.io/draft-js-gutter/)

### apply focus to view, even if none selected
+ algorithm for deciding which view to focus on can be super simple
    + select first 'focusable'
+ think about view properties
    + each view type surfaces certain characteristics
        + focusable is a characteristic
    + as static object
+ [X] translate view type into class
    + want to be able to poll each of the classes to understand its characteristics
        > compile views to store classes, but beware lazy-loading!
    + cannot use static characteristics at view-render time
        + only after the view has loaded (lazily)
+ [ ] implement focus using API request
    + first view that loads and requests focus
    + need some kind of API that the views can request focus from

### resize container view by dragging boundary [parent](/project/user-stories/user-can-view-a-thinkope)
+ [ ] get container view to show a line separating the contained views
+ [ ] detect hover over line
    + allow line to be dragged left or right
+ [ ] on drag complete, propagate update
    + update URL with new split
        + this may be involved, but it's a great model for updating view-only data

### think about internal data structure
+ see [data structure design](/tech/data-structure)
