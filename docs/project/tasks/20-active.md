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

### resize container view by dragging boundary [parent](user-story/user-can-view-a-thinkope)
+ [ ] get container view to show a line separating the contained views
+ [ ] detect hover over line
    + allow line to be dragged left or right
+ [ ] on drag complete, propagate update
    + update URL with new split
        + this may be involved, but it's a great model for updating view-only data

### think about internal data structure
+ see /tech
