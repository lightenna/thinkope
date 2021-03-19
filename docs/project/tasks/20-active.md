---
title: "To do list"
type: "task"
state: "active"
---

### make thinkope embeddable in existing git repos
* think about thinkope remote theme
    * Readily adopted for existing project
        * but does step on existing choices
            * such as the theme selected by the project for their github pages
            * needs to be more flexible than that
        * search for a way to bundle up an installable component
            * we need to embed the SPA trick
                * that requires a 404-page redirect, which means a theme really
        * simplest way is an HTML page
            * need to build flexibility into the URL structure
                * either automatic redirect via the 404 hack
                * or manual redirect using query parameter ?q=
            * the app needs to allow for linking using proper URLs or linking using ?q parameter
                * parser is already sensitive
    * Could use on thinkope.com
        * it's not quite as important to use on thinkope.com
        * if the embed is a single HTML file that can be cut-and-pasted
            * probably should be a simple .js include as well
* Create minimal embeds
    * file
        * suitable for pasting/merging into existing repo
            * simple thinkope.html file to show full thinkope app
        * roll out for other Lightenna open-source repos
            * [Devops Workstream](https://github.com/lightenna/devops-workstream)
    * embed
        * partial view for inclusion into an existing page
        * link to thinkope.com to edit this repo
* Add instructions for `Get started`
    * easy 'just use' on any repo
        * form (autocomplete) to fill in your repo name/URL
            * generates link to thinkope.com/app to view/edit*
    * variety of install methods
        * your own Thinkope server (npm install, npm start)
        * add a page to your GitHub pages (file)
        * embed a Thinkope view on your existing page (embed)
* Getting started is separate from opening up files
    * Once started, you get to see a file selector modal to select which file/files to edit
        * Or create option
        * Or create from sparks
    * but an embed can pre-select the file/files and views (all using URL)
* First steps
    * single embed on Devops Workstream

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
