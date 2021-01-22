---
title: "Data structure"
type: "techdoc"
---

### Model
+ The data source is fundamentally a set of files
    + File format is defined by [file-format.md](file-format.md)
+ The data target is a React Component (UI)
+ The data model maps between the two
+ Requirements: the data model
    + Stores data in flight
    + Lives in memory

### Format
+ probably JSON
    + easy to mock
    + easy to inspect
    + native JS storage
+ fit with likely future DB tech
    + GraphQL responses are JSON
    + enables GraphQL data sources

### Intermediary service
+ reads files
+ returns JSON
+ could use GraphQL
    + but needs to do recursive closure, hard in any query language
    + simplified by [using IDs to flatten](https://stackoverflow.com/questions/44746923/how-to-model-recursive-data-structures-in-graphql)
+ easiest to think about just-a-list-of-blocks (JLOB)
    + initially 1 line per block
+ initially, just returns all the lines

### Just a list of block (JLOB)
+ was just a list of lines (JLOL)
+ query returns a list of blocks
+ each block has an ID
+ each block can have multiple relationships
    + relationship_name: [list of referenced IDs]
    + e.g. children: [21, 58, 14, 98]
+ this means that the client has to parse
    + and potentially reorganise blocks
    + into a nested structure
+ different views will need different properties of the data
    + level of detail
        + show some but not necessarily all nested data
    + references
        + relationships between blocks

### Massively nested data structures
+ [The Blind Men and the Elephant](https://en.wikisource.org/wiki/The_poems_of_John_Godfrey_Saxe/The_Blind_Men_and_the_Elephant)
    + each user sees a different subset of the data
        + high-level visualisations take the top of the tree
        + low-level visualisations focus on a small collection of leaf nodes
+ Thinkope Unified Data Structure (THUDS)
    + each client stores a partial view of the tree
        + JLOB
        + references are all baked into the blocks
        + each block has an ID
        + IDs allow us to make references to other blocks
            + fast lookup needs to be done by ID
                + hash:node
                    ```
                        {
                            "hash-12jg982ty9gfsnd": {
                                content: "It was six men of Indostan"
                            }
                        }
                    ```
            + Draft.js exported content structure is close
                - it's an array rather than an object
    + suspect we'll end up supporting some kind of hierarchy
        + THUDS at the root
        + an array of supported sub-types (components)
            + Draft-type editors
            + other editors
        + views can choose whether they hook into THUDS or one of the sub-types
            + the key thing is that all the information is in every sub-type
        + the sub-types have document constraints
            + e.g. Draft-type editors need a linear list of lines
                + they show those lines as a whole document
                + that document may be a subset of the theoretical total document
                    + it can be a _partial_ view of the total doc
                + that document must be dense
                    + I don't think we can cope with sparse docs in Draft
                        + it will be too hard to reconcile boundaries
                        + or to give the user clear information about how their edits
                            + intersect with the boundaries/sparse sections of the doc
                    + it's conceptually hard enough that they're seeing some part of the total doc

### Changes
+ a change is a patch
    + created by a diff
+ every change has change properties
    + probably similar to [Gerrit](https://gerrit-review.googlesource.com/Documentation/concept-changes.html)
    + not all properties are available on every change
+ properties
    + owner: contributor who created this change
    + assignee: approver, or if not, contributor
    + updated: date this change created or most recently updated
    + lines: list of lines changed
    + type: submit type
        + e.g. MERGE_IF_NECESSARY
+ inherited properties
    + datasource, combination of
        + project
        + branch
    + path
        + path and datasource gives us enough context for line #0
            + all other line numbers calculated relative to this
+ relationships
    + merge conflicts: list of other changes that conflict with this one
    + comments: list of
        + contributor's original message: what this change does/is for/means
        + reviewers' comments
