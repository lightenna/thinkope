---
title: "To do list"
type: "task"
state: "active"
---

### debug integration between value-based and editorState-based views
+ still only proof-of-concept, but better integration informs THUDS design
+ [ ] fix missing content bug
    + ORME view doesn't show all the sub-bullets

### add line numbers to default (draft) markdown text editor
* [Gist](https://gist.github.com/lixiaoyan/79b5740f213b8526d967682f6cd329c0)
* [Gutter example](http://seejamescode.github.io/draft-js-gutter/)

### apply focus to view, even if none selected
* algorithm for deciding which view to focus on can be super simple
    * select first 'focusable'
* think about view properties
    * each view type surfaces certain characteristics
        * focusable is a characteristic
    * as static object
* [X] translate view type into class
    * want to be able to poll each of the classes to understand its characteristics
        > compile views to store classes, but beware lazy-loading!
    * cannot use static characteristics at view-render time
        * only after the view has loaded (lazily)
* [ ] implement focus using API request
    * first view that loads and requests focus
    * need some kind of API that the views can request focus from

### resize container view by dragging boundary [parent](/project/user-stories/user-can-view-a-thinkope)
* [ ] get container view to show a line separating the contained views
* [ ] detect hover over line
    * allow line to be dragged left or right
* [ ] on drag complete, propagate update
    * update URL with new split
        * this may be involved, but it's a great model for updating view-only data

### think about internal data structure
* see [data structure design](/tech/data-structure)
