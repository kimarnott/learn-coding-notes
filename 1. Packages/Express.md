---
tags:
  - web-dev/js/package
  - web-dev/js
  - web-dev/js/express
complete: true
aliases:
  - express
---
[Documentation](https://expressjs.com/)

## Web Applications

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

## Performance

Express provides a thin layer of fundamental web application features, without obscuring Node.js features that you know and love.

## APIs

With a myriad of HTTP utility methods and middleware at your disposal, creating a robust API is quick and easy.

## Middleware

Express is a lightweight and flexible routing framework with minimal core features meant to be augmented through the use of Express middleware modules:

| Middleware Module | Description |
| ----------------- | ----------- |
|[body-parser](https://expressjs.com/en/resources/middleware/body-parser.html)|Parse HTTP request body.|
|[compression](https://expressjs.com/en/resources/middleware/compression.html)|Compress HTTP responses.|
|[connect-rid](https://expressjs.com/en/resources/middleware/connect-rid.html)|Generate unique request ID.|
|[cookie-parser](https://expressjs.com/en/resources/middleware/cookie-parser.html)|Parse cookie header and populate `req.cookies`. See also [cookies](https://github.com/jed/cookies).|
|[cookie-session](https://expressjs.com/en/resources/middleware/cookie-session.html)|Establish cookie-based sessions.|
|[cors](https://expressjs.com/en/resources/middleware/cors.html)|Enable cross-origin resource sharing (CORS) with various options.|
|[errorhandler](https://expressjs.com/en/resources/middleware/errorhandler.html)|Development error-handling/debugging.|
|[method-override](https://expressjs.com/en/resources/middleware/method-override.html)|Override HTTP methods using header.|
|[morgan](https://expressjs.com/en/resources/middleware/morgan.html)|HTTP request logger.|
|[multer](https://expressjs.com/en/resources/middleware/multer.html)|Handle multi-part form data.|
|[response-time](https://expressjs.com/en/resources/middleware/response-time.html)|Record HTTP response time.|
|[serve-favicon](https://expressjs.com/en/resources/middleware/serve-favicon.html)|Serve a favicon.|
|[serve-index](https://expressjs.com/en/resources/middleware/serve-index.html)|Serve directory listing for a given path.|
|[serve-static](https://expressjs.com/en/resources/middleware/serve-static.html)|Serve static files.|
|[session](https://expressjs.com/en/resources/middleware/session.html)|Establish server-based sessions (development only).|
|[timeout](https://expressjs.com/en/resources/middleware/timeout.html)|Set a timeout perioHTTP request processing.|
|[vhost](https://expressjs.com/en/resources/middleware/vhost.html)|Create virtual domains.|
|[helmet*](https://github.com/helmetjs/helmet)|Helps secure your apps by setting various HTTP headers.|
|[passport*](https://github.com/jaredhanson/passport)|Authentication using “strategies” such as OAuth, OpenID and many others. See [passportjs.org](https://passportjs.org/) for more information.|

\*This information refers to third-party sites, products, or modules that are not maintained by the Expressjs team. Listing here does not constitute an endorsement or recommendation from the Expressjs project team.

```dataview
TABLE without id file.inlinks as "Where is this used?"
WHERE file.name = this.file.name
SORT file.inlinks.order ASC 
```