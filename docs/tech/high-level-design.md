---
title: "App design"
type: "techdoc"
---

### Techs to shape architecture
+ React - component-driven views
+ Redux - for editor undo history
+ [Draft.js](https://github.com/facebook/draft-js) - for editor view
    + Can embed multiple editors from the [awesome gallery](https://github.com/nikgraf/awesome-draft-js)
+ Later
    + [Next.js](https://nextjs.org/) - SSR
    + [Next Redux Wrapper](https://github.com/kirill-konshin/next-redux-wrapper) - for sharing Redux stores server-side
    + Either [CouchDB](https://couchdb.apache.org/) and [PouchDB](https://pouchdb.com/) - syncable database (self hosted)
        + connected by [redux-pouchdb](https://github.com/rahulraghavankklm/redux-pouchdb)
    + Or [Firebase](https://firebase.google.com/) - proprietary syncable database (PaaS)

### Data architecture
+ Changes are persisted as immutable nodes in update chain
+ Undo/redo as traversal of that chain
+ Real-time pulls bring other users' changes into chain
    + potentially including merge conflicts
    + Could merge by inserting pulled state into update chain then re-executing the downstream chain
+ Save as commit and push
    + very little separation between (user's) local repo and (shared) remote repo
