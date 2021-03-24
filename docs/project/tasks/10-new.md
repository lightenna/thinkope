---
title: "Backlog"
type: "task"
state: "new"
---

### capture selection state into URL
+ also apply URL selection to views
+ selection needs to be focus-aware
    + view with focus:true sets the actual selection
    + views without it set some kind of highlight or virtual selection
+ see [view design](/tech/view-design)

### create local file service [parent](/project/user-stories/user-can-view-a-thinkhope)
+ read file from local source
    + Node.js microservice
    + local instance of TH that serves local repo
+ empowers coders to clone template/checkout the repo
    + work on local lists using the interface
    + develop views
+ A/C
    + [ ] assign name to service
    + [ ] service spins up within constrained scope
        + should not have access to whole filesystem
    + [ ] request includes relative path filename
    + [ ] response returns JLOB as JSON
        + does not need to be highly-featured; simplest thing for now

### create first remote microservices
+ create cadence
+ create auth
    + might be worth doing auth clean, without any deps
    + because it will facilitate others' deployment
+ deploy to https://services.thinkho.pe/
    + my instance of the microservices that support TH
    + provisioned separately using K8s / Helm chart
        + stick with K8s cluster
            + ingress controller to route between the different services

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

### resize container view by dragging boundary [parent](/project/user-stories/user-can-view-a-thinkhope)
* [ ] get container view to show a line separating the contained views
* [ ] detect hover over line
    * allow line to be dragged left or right
* [ ] on drag complete, propagate update
    * update URL with new split
        * this may be involved, but it's a great model for updating view-only data

### add search and replace functionality to Editor views
https://reactrocket.com/post/draft-js-search-and-replace/

### create javascript to replace empty links with page thumbnails

### refactor theme files out into a new remote theme
+ like to remove all theme cruft from `/docs` folder
    + thinkhope-theme

### evaluate comment options
+ Comments option using source infra
[GitHub issues](https://aristath.github.io/blog/static-site-comments-using-github-issues-api)
    - but not in git

### set up react-helmet for head metadata
+ set metadata per page
    + set title
    + set meta tags
[react-helmet](https://www.npmjs.com/package/react-helmet)

### integrate Jupyter as another editor view
+ [Jupyter Notebook](https://jupyter.org/)
+ use [MyBinder](https://mybinder.readthedocs.io/en/latest/)
    + for docker-based run-time execution of Notebooks

### switch from whole-text to patches [parent](/project/user-stories/user-can-view-a-thinkhope)
+ currently passing whole-text
  - which slows dramatically as text length increases
  + because it creates a lot of re-rendering and string parsing
+ [ ] create patch on input event
  + patch passed through to all other components
  + work out how to diff
+ [ ] save editor text into the store using patches
