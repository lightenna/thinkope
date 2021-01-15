---
title: "To do list"
type: "task"
state: "active"
---

### create markdown editor [parent](/project/user-stories/user-can-view-a-thinkope)
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
        - no `EditorState.createWithText` function
    + 0.11.x branch incomplete and no progress since May 2019
        + doesn't run
+ integrate Plugin [Fluent Markdown Plugin](https://github.com/makeflow/draft-js-fluent-markdown-plugin)
+ integrate Plugin [Markdown Shortcuts Plugin](https://github.com/ngs/draft-js-markdown-shortcuts-plugin)
    + or could use [withspectrum branch](https://github.com/withspectrum/draft-js-markdown-plugin)

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
