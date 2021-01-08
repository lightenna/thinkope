---
title: "To do list"
type: "task"
state: "active"
---

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
+ [ ] implement focus:true attribute

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
