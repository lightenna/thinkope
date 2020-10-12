---
title: "General design"
type: "think"
---

### View URLs
+ Encoding options
    + JSON
        - requires a lot of URL-encoded character (e.g. ")
        + JSON5 is a nice option, but it's not supported in the browser
    + Query params
        - difficult to sort out nesting
+ This can be parsed with ES6
    + [one-liner ES6 answer](https://stackoverflow.com/questions/8648892/how-to-convert-url-parameters-to-a-javascript-object#answer-50147341)
        + [good enough support](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
        - fails with arrays
    + Validated JS code
```
console.log(Object.fromEntries(new URLSearchParams("type=fish&x=0.00002345&y=0.000006789&w=1.0&h=0.05")));
```
    + [ES 6 alternative](https://stackoverflow.com/questions/8648892/how-to-convert-url-parameters-to-a-javascript-object#answer-52539264)
        - fails with arrays of nested stuff
    + vouldn't validate with JS console
```
console.log(groupParamsByKey(new URLSearchParams("type=container&orient=horiz&split=35.0&sub=%22type=fish&x=0.1&y=0.1&w=0.05&h=0.05%22&sub=%22type=fish&x=0.2&y=0.2&w=0.05&h=0.05%22")));
```
> Stick with simple URL-encoding of JSON blocks for now
    + need object nesting, which is very hard to accomplish as query params
