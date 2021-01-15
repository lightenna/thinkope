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
+ integrate Editor [Mulesoft's Markdown draft.js](https://www.npmjs.com/package/md-draft-js)
    + looks like the open source repo has been pulled
    + but it's still available in NPM, MIT licence
+ integrate Editor [Draftail](https://www.draftail.org/)
+ integrate Plugin [Fluent Markdown Plugin](https://github.com/makeflow/draft-js-fluent-markdown-plugin)

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
