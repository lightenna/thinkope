---
title: "To do list"
type: "task"
state: "active"
---

### embed editor view [parent](user-story/user-can-view-a-thinkope)
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
+ [ ] save editor text into the store
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
    + [ ] revert to using configureStore() with serializable objects
    + look at [Redux Draft](https://github.com/gocreating/redux-draft)
        + npm install and test
+ [ ] create patch on input event
    + patch passed through to all other components
    + work out how to diff
+ [ ] save editor text into the store using patches

### ingest data from local source
+ load as JLOB
+ pass to editor on init
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
