---
title: "To do list"
type: "task"
state: "active"
---

### ingest data from local source [parent](user-story/user-can-view-a-thinkope)
+ load as JLOB
+ pass to Redux (internal state) on init
    + [draftJS how to init](https://stackoverflow.com/questions/35884112/draftjs-how-to-initiate-an-editor-with-content)
+ identify ingest location
    + really it's got nothing to do with the editors
    + it's central, the redux store/editored slice
    + but it's based on URL and we only parse that out in ViewWrapper
+ [X] fix "cannot update" bug
    + clicking dispatches event, but does not set caret
    > moved to single editorStateWrap around entire ViewWrapper
    + makes sense because we've got
        + a single redux store
        + single reducer
        + multiple views dispatching events
+ [ ] design switch out stub load for real one
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
                + might be worth 

### apply focus to first 'focusable' view in container [parent](user-story/user-can-view-a-thinkope)
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
        + maybe hashbang #L1-L6
            + maybe with character offsets #L1.13-L6.4
        + [github example](https://github.com/aderaaij/react-redux-github-api-example/blob/master/src/constants/ActionTypes.js#L1-L6)
    + clicking into an editor pane highlights it
        + virtual selections become real selections

### create markdown editor [parent](user-story/user-can-view-a-thinkope)
+ three views
    + DefaultEditor
        + sees raw text
    + MarkdownEditor
        + sees nicely rendered Markdown-as-HTML
        + lots of formatting buttons
    + TestEditor
        + raw view of EditorState

### resize container view by dragging boundary [parent](user-story/user-can-view-a-thinkope)
+ [ ] get container view to show a line separating the contained views
+ [ ] detect hover over line
    + allow line to be dragged left or right
+ [ ] on drag complete, propagate update
    + update URL with new split
        + this may be involved, but it's a great model for updating view-only data

### think about internal data structure
+ see /tech
