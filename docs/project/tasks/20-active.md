---
title: "To do list"
type: "task"
state: "active"
---

### research editor model (again)
* could abandon ORME view
    * or could instead make all editors work line-by-line
        * so every change is line-by-line
        * that way if ORME view is missing something it just makes it uneditable in that view
            * which is consistent with more visual views (like Gantt charts)
* invent (or discover existing) micro-diff format
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
    * research CRDT to see if it fits with text+microdiffs approach
        * thinkope.com sits at the edge of a peer-to-peer network of Thinkope servers
            * clients are spawned in a browser from a server
                * but they participate in the network as equals
            * servers bring a data set
                * some servers might use APIs and auth to talk to data stores or data service providers (e.g. GitHub)
        * leaning towards [automerge](https://github.com/automerge/automerge) for microdiff format
            * interested in [ReasonML](https://reasonml.github.io/docs/en/what-and-why)
                * Thinkope is graph-based, so could fit with [GUN](https://gun.eco/)
            * [good HN-posted OT vs CRDT analysis](https://news.ycombinator.com/item?id=22039950)
                * TinyMCE team opted for [OT and Slate](https://www.tiny.cloud/blog/real-time-collaborative-editing-slate-js)
                    * take another look at [Slate](https://github.com/ianstormtaylor/slate) as well-aligned on 'why'
                * Commercial editors like [Froala](https://froala.com/wysiwyg-editor/pricing/)
                    * not really an option for open-source Thinkope
                * [CRDT](https://crdt.tech/implementations) as subset of OT
                    * [data laced with history](http://archagon.net/blog/2018/03/24/data-laced-with-history/)
                        * [semi-lattice rather than disjoint tree structure](https://www.google.com/search?rlz=1C1GCEA_enGB835GB835&sxsrf=ALeKk03EYRIxbtiUD6e67PFcdUiIGZgrrg%3A1615801142721&ei=NitPYI3CK8Cs1fAPjpqciAw&q=semilattice+vs+tree&oq=semilattice+vs+tree&gs_lcp=Cgdnd3Mtd2l6EAMyBQghEKABMgUIIRCgAToHCAAQsAMQQzoHCC4QsAMQQzoHCAAQRxCwAzoCCAA6BAgAEB46BggAEBYQHlCkjwFYm5wBYLydAWgBcAJ4AIABd4gB9AWSAQM4LjGYAQCgAQGqAQdnd3Mtd2l6yAEKwAEB&sclient=gws-wiz&ved=0ahUKEwiNtY6pgLLvAhVAVhUIHQ4NB8EQ4dUDCA0&uact=5)
            * model interacts with DB, so could be [PouchDB](https://pouchdb.com/)
        * look at [Logux](https://logux.io/)

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
+ every view has multiple lists of people
    + each person has a role
        + read-access
            + contributor
                + read-access and has submitted a pull request and had it accepted
        + write-access
            + collaborator
                + write-access and has made changes
    + each person-role may also have a status
        + e.g. active
            + nice to show a list of active collaborators on a single view where loads of people are messing with it
            + thinking little circle with avatars
                + that way you can watch people move between different parts of the project

### think about internal data structure
* see [data structure design](/tech/data-structure)
