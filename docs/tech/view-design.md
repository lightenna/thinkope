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
    + a resource reference to the content
    + a unique selector for the view
    + current view-specific settings
        + selection data
            + hashbang for selection to be consistent with Github
            + #L<line-number>.<character-number>-L<line-number>.<character-number>
        + one view has focus:true
+ Try to comply with [RFC3986](https://tools.ietf.org/html/rfc3986#section-3.4)
    + pchar (path character) followed by query (query parameter)
```
   query         = *( pchar / "/" / "?" )
   pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
   pct-encoded   = "%" HEXDIG HEXDIG
   unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
   sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
                 / "*" / "+" / "," / ";" / "="
```
+ Examples
        + default view, default local source
            + /path/including/multiple/slashes/file.type
        + default view with named datasource
            + /@sourcename/path/including/multiple/slashes/file.type
        + named view
            + /path/including/multiple/slashes/file.type?view=fish
        + named view with view-specific settings
            + JSON block to allow for view-nesting
            + illegal brackets and their contents would be URL encoded
                + `[]` as %5B%5D
                + `{}` as %7B%7D
                + double quotes throughout as legal JSON required for JSON.parse()
                    - slightly more verbose but simpler for now
            + /@sourcename/path/including/multiple/slashes/file.type?view={"type":"fish","x":0.00002345,"y":0.000006789,"w":1.0,"h":0.05}
        + nested views
            + /@sourcename/path/including/multiple/slashes/file.type?view={"type":"container","orient":"horiz","split":[35.0,65.0],"sub":[{"type":"fish","x":0.1,"y":0.1,"w":0.05,"h":0.05},{"type":"fish","x":0.2,"y":0.2,"w":0.05,"h":0.05},{"type":"fish","x":0.1,"y":0.1,"w":0.4,"h":0.4})
        + default view with marked selection by line
            + /path/including/multiple/slashes/file.type#L1-6
        + default view with marked selection by character
            + /path/including/multiple/slashes/file.type#L1.13-6.4

### Views in views
+ Every view can contain multiple nested views

### View optimisation
+ Views can be server-side rendered (SSR)

### Focus
+ A single view can have the focus (caret) at any one time
    + Keystrokes are fed to that view
    + Multiple views can be impacted by those keystrokes
        + Impacted views are probably read-only
+ The view with focus (VWIF) is read/write
    + all views without focus (VWOF) are read-only
+ However all VWOF might also be viewed by someone[else] somewhere[else]
    + or just me in another tab/browser window/on another device
    + therefore all VWOFs could get receive changes
        + which could then cascade through other views
+ Two types of change
    + Local changes
        + User click/drag/pinch in any view
        + User keystroke in a VWIF
        + Computer produces output as part of local execution
    + Network changes
        + Received by ViewWrapper
            + propagated through all affected views

### Markdown
+ Editor view allows you to edit text, simply as text
    + only text
    + no buttons
    + simple raw code
        + but maybe with suggestions
            + code
            + spelling corrections
            + uppercasing
+ Markdown editor view allows you to edit rendered markdown
    + add UI buttons for bold/italic/list etc.
https://github.com/withspectrum/draft-js-markdown-plugin
