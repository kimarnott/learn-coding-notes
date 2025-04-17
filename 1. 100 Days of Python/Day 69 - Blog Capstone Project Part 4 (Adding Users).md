---
tags:
  - day
  - python
order: 69
aliases:
  - 69. Blog Capstone (4. Users)
complete: true
---
- [ ] Concept
- [x] Capstone
- [ ] Portfolio

# General

# Packages

```python
from datetime import date  
from flask import Flask, abort, render_template, redirect, url_for, flash  
from flask_bootstrap import Bootstrap5  
from flask_ckeditor import CKEditor  
from flask_gravatar import Gravatar  
from flask_login import UserMixin, login_user, LoginManager, current_user, logout_user, login_required  
from flask_sqlalchemy import SQLAlchemy  
from sqlalchemy.orm import relationship, DeclarativeBase, Mapped, mapped_column  
from sqlalchemy import Integer, String, Text, ForeignKey  
from functools import wraps  
from werkzeug.security import generate_password_hash, check_password_hash  
# Import your forms from the forms.py  
from forms import CreatePostForm, RegisterForm, LoginForm, CommentForm
```

> [!tip]+ Packages
> - [[Flask]]
> - [[Bootstrap Flask]]
> - [[Flask CKEditor]]
> - [[Flask Gravatar]]
> - [[Flask Login]]
> - [[Flask SQLAlchemy]]
> - [[Functools]]
> - [[Datetime]]

# Requirements and Solutions
## 1 -  Register New Users
1. Create a WTForm in the **forms.py** called `RegisterForm`
2. Create a new `User` table for your database. The data the user entered should be used to create a new entry in your **blog.db** within a `User` table.
3. Create your new user within the /register route. Hash and salt the user's password using Werkzeug. 
4. Use Bootstrap-Flask's `render_form()` [macro](https://bootstrap-flask.readthedocs.io/en/stable/basic/#macros) to render the form on the **register.html**.

<hr />

```dataviewjs
dv.view("customJS/navPY")
```