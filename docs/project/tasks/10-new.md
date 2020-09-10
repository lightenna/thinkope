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

### create first microservices
+ create cadence
+ create auth
    + might be worth doing auth clean, without any deps
    + because it will facilitate others' deployment
+ deploy to https://services.thinko.pe/
    + my instance of the microservices that support TH
    + provisioned separately using K8s / Helm chart
        + stick with K8s cluster
            + ingress controller to route between the different services

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

