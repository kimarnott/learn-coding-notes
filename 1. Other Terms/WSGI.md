[Web Server Gateway Interface](https://wsgi.readthedocs.io/en/latest/)

It is a specification that describes how a web server communicates with web applications, and how web applications can be chained together to process one request. Normal web servers can't run Python applications, so a special type of server was created (WSGI) to run our Flask app.  Essentially, a WSGI server standardises the language and protocols between our Python Flask application and the host server.

WSGI is a Python standard described in detail in [**PEP 3333**](https://peps.python.org/pep-3333/).


```dataview
table without id file.inlinks as "Where is this used?"
where file.name = this.file.name
```