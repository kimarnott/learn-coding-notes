---
tags:
  - web-dev/js/package
  - web-dev/js
  - web-dev/js/express/middleware
complete: true
aliases:
  - body-parser
---
[Documentation](https://expressjs.com/en/resources/middleware/body-parser.html)

Node.js body parsing middleware.

Parse incoming request bodies in a middleware before your handlers, available under the `req.body` property.

>[!note] Note 
>As `req.body`’s shape is based on user-controlled input, all properties and values in this object are untrusted and should be validated before trusting. 
>
>For example, `req.body.foo.toString()` may fail in multiple ways, for example the `foo` property may not be there or may not be a string, and `toString` may not be a function and instead a string or other user input.

```dataview
TABLE without id file.inlinks as "Where is this used?"
WHERE file.name = this.file.name
SORT file.inlinks.order ASC 
```