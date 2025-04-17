---
tags:
  - python/package
  - python
complete: true
aliases:
  - flask_login
---
[Documentation](https://flask-login.readthedocs.io/en/latest/)

Flask-Login provides user session management for Flask. It handles the common tasks of logging in, logging out, and remembering your users’ sessions over extended periods of time.

It will:
- Store the active user’s ID in the [Flask Session](https://flask.palletsprojects.com/en/latest/api/#sessions), and let you easily log them in and out.
- Let you restrict views to logged-in (or logged-out) users. ([`login_required`](https://flask-login.readthedocs.io/en/latest/#flask_login.login_required "flask_login.login_required"))
- Handle the normally-tricky “remember me” functionality.
- Help protect your users’ sessions from being stolen by cookie thieves.
    
However, it does not:
- Impose a particular database or other storage method on you. You are entirely in charge of how the user is loaded.
- Restrict you to using usernames and passwords, OpenIDs, or any other method of authenticating.    
- Handle permissions beyond “logged in or not.”
- Handle user registration or account recovery.

```dataview
TABLE without id file.inlinks as "Where is this used?"
WHERE file.name = this.file.name
SORT file.inlinks.order ASC 
```