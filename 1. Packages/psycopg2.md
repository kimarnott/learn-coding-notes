---
tags:
  - python/package
  - python
complete: true
---
[Documentation](https://www.psycopg.org/docs/)

Psycopg is the most popular PostgreSQL database adapter for the Python programming language. Its main features are the complete implementation of the Python DB API 2.0 specification and the thread safety (several threads can share the same connection). It was designed for heavily multi-threaded applications that create and destroy lots of cursors and make a large number of concurrent “INSERT”s or “UPDATE”s.

Psycopg 2 is mostly implemented in C as a libpq wrapper, resulting in being both efficient and secure. It features client-side and server-side cursors, asynchronous communication and notifications, “COPY TO/COPY FROM” support. Many Python types are supported out-of-the-box and adapted to matching PostgreSQL data types; adaptation can be extended and customized thanks to a flexible objects adaptation system.

Psycopg 2 is both Unicode and Python 3 friendly.

>[!Note]
>The psycopg2 package is still widely used and actively maintained, but it is not expected to receive new features.
>
>[Psycopg 3](https://pypi.org/project/psycopg/) is the evolution of psycopg2 and is where [new features are being developed](https://www.psycopg.org/psycopg3/docs/index.html): if you are starting a new project you should probably start from 3!
```dataview
TABLE without id file.inlinks as "Where is this used?"
WHERE file.name = this.file.name
SORT file.inlinks.order ASC 
```