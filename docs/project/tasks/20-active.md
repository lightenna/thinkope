---
title: "To do list"
type: "task"
state: "active"
---

### create container view [parent](user-story/user-can-view-a-thinkope)
+ acceptance criteria
    + [X] contains nested 1 or more sub-views
    + [X] allows proportional screen splitting
    + [X] passes down URL-based view information to sub-views
    + [ ] supports SSR
+ [X] pass view state into view as prop
    + sourced from URL
    + [test](http://localhost:3000/@something/two/three?view={%22type%22:%22fish%22,%22x%22:0.00002345,%22y%22:0.000006789,%22w%22:1.0,%22h%22:0.05})
        + [X] add to unit tests
+ [X] process nested children
    + ViewWrapper pulls out the children
        + instantiates ViewWrappers for each of them
    + [test](http://localhost:3000/@something/two/three?view={%22type%22:%22container%22,%22orient%22:%22horiz%22,%22split%22:35.0,%22sub%22:[{%22type%22:%22fish%22},{%22type%22:%22fish%22}]})
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
+ [ ] get container view to show a line separating the contained views
+ [ ] detect hover over line
    + allow line to be dragged left or right
+ [ ] on drag complete, propagate update
    + update URL with new split
        + this may be involved, but it's a great model for updating view-only data

### think about internal data structure
+ see /tech
