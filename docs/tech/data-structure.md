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
+ easiest to think about just-a-list-of-lines (JLOL)
+ initially, just returns all the lines

### Just a list of lines (JLOL)
+ query returns a list of lines
+ each line has an ID
+ each line can have multiple relationships
    + relationship_name: [list of referenced IDs]
    + e.g. children: [21, 58, 14, 98]
+ this means that the client has to parse
    + and potentially reorganise lines
    + into a nested structure
