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

### Terminating full stops
+ People generally don't put stops at the end of list items
    + It feels unnatural, even though it may present a technical challenge to divine them later
+ We can infer a full stop from a line that starts with a capital letter
> Full stops can be optionally included to force a new sentence

### Initial capital letters
+ Not sure about this one yet
+ I suspect we need some kind of marker for sentences
    + a single indent is probably a comma or a semi-colon
+ A series of same-ident lines produce a series of sentences
    + one
    + two
    + Three
        + renders as `One. Two. Three.`
> Capital letters can be optionally included to force a new sentence