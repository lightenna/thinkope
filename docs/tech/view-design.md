---
title: "View design"
type: "techdoc"
---

### View complexity
+ Views at their most simple
    + receive JSON data
    + render it out to the DOM (via HTML if SSR-supporting)

### View URLs
+ Every view has a URL
+ The URL contains
    + a unique locator for the view
    + current view-specific settings

### Views in views
+ Every view can contain multiple nested views

### View optimisation
+ Views can be server-side rendered (SSR)
