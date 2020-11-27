---
title: "To do list"
type: "task"
state: "active"
---

### switch from whole-text to patches [parent](user-story/user-can-view-a-thinkope)
+ currently passing whole-text
    - which slows dramatically as text length increases
    + because it creates a lot of re-rendering and string parsing
+ [ ] create patch on input event
    + patch passed through to all other components
    + work out how to diff
+ [ ] save editor text into the store using patches

### apply focus to first 'focusable' view in container [parent](user-story/user-can-view-a-thinkope)
+ probably a depth-first search across all containers
    + until we find a focusable view

### test two editor views side-by-side [parent](user-story/user-can-view-a-thinkope)

### ingest data from local source [parent](user-story/user-can-view-a-thinkope)
+ load as JLOB
+ pass to Redux (internal state) on init
    + [draftJS how to init](https://stackoverflow.com/questions/35884112/draftjs-how-to-initiate-an-editor-with-content)

### resize container view by dragging boundary [parent](user-story/user-can-view-a-thinkope)
+ [ ] get container view to show a line separating the contained views
+ [ ] detect hover over line
    + allow line to be dragged left or right
+ [ ] on drag complete, propagate update
    + update URL with new split
        + this may be involved, but it's a great model for updating view-only data

### think about internal data structure
+ see /tech
