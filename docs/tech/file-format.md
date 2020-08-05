---
title: "File format"
type: "techdoc"
---

### General file format
+ Markdown
    + can augment with HTML if necessary, but aim not to
+ Front matter YAML
    + Jekyll mandates it's at the top
    + Github.com processes that in table form
+ Naming
    + stick with dash ('-') separators
[Google style ref](https://developers.google.com/style/filenames)

### Task format
+ Front matter defines tags for all lines
    + can add optional line-specific tags (name:value pairs)
+ Example task
    + as code
        ```
            ### task name [assignee](/user/@cleverlight)
            + additional description [type](/type/description)
            + [ ] sub-task
                + [ ] sub-sub task
                    + [ ] sub-sub-sub task etc.
                + [ ] outstanding task
                + [X] completed task
                + [x] skipped task
                    + i.e. resolved but not done
            + general comment
                + thinking
                + more thinking
                + [ ] something to do
        ```
    + rendered

### task name [assignee](/user/@cleverlight)
+ additional description [type](/type/description)
+ [ ] sub-task
    + [ ] sub-sub task
        + [ ] sub-sub-sub task etc.
    + [ ] outstanding task
    + [X] completed task
    + [x] skipped task
        + i.e. resolved but not done
+ general comment
    + thinking
    + more thinking
    + [ ] something to do
