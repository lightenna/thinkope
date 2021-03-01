---
title: "To do list"
type: "task"
state: "active"
---

### think about Editor synchronisation (local and remote)
+ only difference between the two is latency
+ draft-js does at least have a model for dealing with this
    + [race conditions in Draft](https://draftjs.org/docs/advanced-topics-editorstate-race-conditions)
+ want to be able to accommodate updates from all type of view.  
    + They can be nice elegant fast updates (native THUDS)
    + pretty damn quick (translation from Draft.js on an update-by-update basis)
    + or horribly slow complete reflowing (Prosemirror)
        + should draw a line through Prosemirror because it can't be updated with deltas
        + Then again, I don't have any evidence that Draft.js can either
            + The serialised raw data structure isn't the internal native one 
            + but it's immutable
                + so the editorState can and should move from one editorState to a completely new editorState on each keypress, then render
        + `handlePastedText` may be a way to do it

### debug integration between value-based and editorState-based views
* still only proof-of-concept, but better integration informs THUDS design
* [x] fix missing content bug
    * ORME view doesn't show all the sub-bullets
    * ORME parser is a problem
        * doesn't like bulletted lists where some (but not all) elements have a tick box
    * It's sort of ruling ORME out of contention
        * because we'll need to do a lot of work to parse out the incompatible bits
    * Fundamental problem with these editors
        * .md -> editor -> .md is currently a destructive op
            * that's not acceptable
        * Need to process text without destroying the things that don't meet the format
* [x] ORME typing bug
    * values are written back to ORME view
        * which sets the caret in the wrong place
* [x] add time delay on updating the ORME view
    * when typing in ED, text changes are written to ORME instantly
* could abandon ORME view
    * or could instead make all editors work line-by-line
        * so every change is line-by-line
        * that way if ORME view is missing something it just makes it uneditable in that view
            * which is consistent with more visual views (like Gantt charts)
* invent micro-diff format
    * start with simple Draft JS text-only editor
    * dispatch() should send a microdiff
        * microdiff list is preserved in Redux
        * editors parse the list to get their state
            * every DraftJS editor has its own editorState
                * because some may have highlighting/formatting, some not
                * which means they've all got different block lists (JLOB)
            * every editor should re-evaluate the entire microdiff list for every change
                * because remote changes could arrive out of order
                * don't get the editors to do it
                    * the DataWrapper should merge all neighbouring microdiffs
                        * into a minimal set of changes
        * base this on some established real-time model synchronisation engine based on OT
            * like [Racer](https://github.com/derbyjs/racer)
        * for any kind of real-time sync, we need to bake a compatible data model
            * [Collab editing](http://cricklet.github.io/sites/blue/index.html)
            * need to choose between [OT or CRDT/WOOT](https://arxiv.org/ftp/arxiv/papers/1810/1810.02137.pdf)
            * [Firebase](https://firebase.google.com/) is a mature OT-based solution
            * [Textile](https://docs.textile.io/) is an open-source CRDT-based solution (I think)

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

### think about Think-scope
+ create a group
    + beware replicating CMS functionality
+ open language
    + allow for the renaming of
    + who else am I thinking with
        + collective known for a group of thinkers: a ponder of philosophers
            + [fairly comprehensive list](http://www.collectivenouns.biz/list-of-collective-nouns/collective-nouns-people/)
    + [musicians](https://www.answers.com/Q/What_is_the_collective_noun_for_the_group_of_musicians)
    + [gyles brandreth](https://www.gylesbrandreth.net/blog/2019/1/16/a-confusion-of-politicians-collective-nouns-for-our-times)
+ permissions
    + joiners
        + no joiners/invitation only
        + request to join/must be approved
        + anyone may join
    + readable by the <group>
    + writeable
    + commentable

### think about internal data structure
* see [data structure design](/tech/data-structure)
