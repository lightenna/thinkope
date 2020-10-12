---
title: "To do list"
type: "task"
state: "active"
---

### migrate away from Slingshot [parent](user-story/user-can-view-a-thinkope)
+ too many issues with hot reloading
+ use create-react-app instead
`npx create-react-app my-app --template redux`

### create container view [parent](user-story/user-can-view-a-thinkope)
+ acceptance criteria
    + [ ] contains nested 1 or more sub-views
    + [ ] allows proportional screen splitting
    + [ ] supports SSR
    + [ ] passes down URL-based view information to sub-views
+ pass view state into view as prop
    + sourced from URL
    + nested children

### think about internal data structure
+ see /tech
