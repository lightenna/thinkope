---
title: "Backlog"
type: "task"
state: "new"
---

### create first view [parent](user-story/user-can-view-a-thinkope)
+ is a React component
+ simple view
+ takes JSON data and renders to DOM

### produce mock JSON data
+ static example to feed initial view development
    + will also help with testing

### create local file service [parent](user-story/user-can-view-a-thinkope)
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
+ deploy to https://services.thinko.pe/
    + my instance of the microservices that support TH
    + provisioned separately using K8s / Helm chart
        + stick with K8s cluster
            + ingress controller to route between the different services

### add search and replace functionality to Editor views
https://reactrocket.com/post/draft-js-search-and-replace/

### create javascript to replace empty links with page thumbnails

### refactor theme files out into a new remote theme
+ like to remove all theme cruft from `/docs` folder
    + thinkope-theme

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

### switch from whole-text to patches [parent](user-story/user-can-view-a-thinkope)
+ currently passing whole-text
  - which slows dramatically as text length increases
  + because it creates a lot of re-rendering and string parsing
+ [ ] create patch on input event
  + patch passed through to all other components
  + work out how to diff
+ [ ] save editor text into the store using patches

