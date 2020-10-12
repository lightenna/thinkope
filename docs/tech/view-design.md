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
+ Try to comply with [RFC3986](https://tools.ietf.org/html/rfc3986#section-3.4)
    + pchar (path character) followed by query (query parameter)
   query         = *( pchar / "/" / "?" )
   pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
   pct-encoded   = "%" HEXDIG HEXDIG
   unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
   sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
                 / "*" / "+" / "," / ";" / "="
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
            + /@sourcename/path/including/multiple/slashes/file.type?view={"type":"container","orient":"horiz","split":35.0,"sub":[{"type":"fish","x":0.1,"y":0.1,"w":0.05,"h":0.05},{"type":"fish","x":0.2,"y":0.2,"w":0.05,"h":0.05},{"type":"fish","x":0.1,"y":0.1,"w":0.4,"h":0.4})

### Views in views
+ Every view can contain multiple nested views

### View optimisation
+ Views can be server-side rendered (SSR)
