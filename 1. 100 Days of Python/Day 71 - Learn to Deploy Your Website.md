---
tags:
  - day
  - python
order: 71
aliases:
  - 71. Deploy Blog
complete: true
---
- [x] Concept
- [ ] Capstone
- [ ] Portfolio


# General
Publish Flask website onto the internet. Using the blog website developed on [[Day 69 - Blog Capstone Project Part 4 (Adding Users)]], add a `.gitignore` file, and use git version control (which is integrated in Python! - expand the toolbar via the hamburger menu near the project name in the top left --> go to VCS... or do it through the terminal).

Then create environment variables for anything with `app.config['#']` and set the debug mode of the app to false.

Then use [[gunicorn]] [[WSGI]], which we configure by adding gunicorn to the `requirements.txt` and creating a file called `Procfile` (note that there is no extension, and case is important). In this Procfile we say:

`web: gunicorn main:app`

Which tells our hosting provider to create a web worker that is able to receive HTTP requests, and to use gunicorn to serve the web app. We tell it the name and location of the Flask `app` object, in the `main`.py file.  

Then we linked PyCharm with GitHub and pushed our repo (the VCS menu is updated to 'Git', where we find 'GitHub' and 'Share Project on GitHub').

Used `render` as our hosting provider, which can deploy apps directly from a GitHub repo (used 'New Web Service'). Make sure the start command matches the line in the Procfile created earlier. Then tell render the environment variables.

`render` lets you create an instance of PostgreSQL, once built, take the `Internal Database URL` produced by render and set that as the DB_URI environment variable, the one that matches with `app.config['SQLALCHEMY_DATABASE_URI']` in main.py. Make sure that the URL starts with `postgresql` to meet the SQLAlchemy requirements.

And we're done!

# Packages
```python
from datetime import date  
from flask import Flask, abort, render_template, redirect, url_for, flash, request  
from flask_bootstrap import Bootstrap5  
from flask_ckeditor import CKEditor  
from flask_gravatar import Gravatar  
from flask_login import UserMixin, login_user, LoginManager, current_user, logout_user  
from flask_sqlalchemy import SQLAlchemy  
from sqlalchemy.orm import relationship, DeclarativeBase, Mapped, mapped_column  
from sqlalchemy import Integer, String, Text  
from functools import wraps  
from werkzeug.security import generate_password_hash, check_password_hash  
from forms import CreatePostForm, RegisterForm, LoginForm, CommentForm
import os
```


> [!tip]+ Packages
> [[Bootstrap Flask]], [[Flask CKEditor]], [[Flask Login]], [[Flask Gravatar]], [[Flask WTF]], [[Werkzeug]], [[Flask]], [[Flask SQLAlchemy]], [[gunicorn]], [[psycopg2]] 
> 


```dataviewjs
dv.view("customJS/navPY")
```

