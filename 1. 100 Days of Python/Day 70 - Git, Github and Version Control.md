---
tags:
  - day
  - python
  - "#version-control"
order: 70
aliases:
  - 70. Version Control
complete: true
---
- [x] Concept
- [ ] Capstone
- [ ] Portfolio

# General
See: [[CLI]]
Checkout: https://learngitbranching.js.org

# Local Commands

Working directory: the folder/directory where you initialise your directory (this is what git will track)

> [!success]- `git init`
> Initialise an empty git repo in whatever directory (the working directory) you're in (this is a hidden file)

> [!success]- `git status`
> See which files are in your staging area (in your working directory, but not in staging area)
> - Red - in directory, but not in staging area
> - Green - in directory and staging area

> [!success]- `git add`
> Contents
>`git add .` : adds all files to staging area
 >`git add <file>`: adds file to staging area

> [!success]- `git rm --cached -r`
>- `git rm --cached -r <file>`: remove file from staging area
>- `git rm --cached -r .`: remove everything in directory from staging area

> [!success]- `git commit`
> A commit in a git repo records a snapshot of all the (tracked) files in your directory.
> To keep commits as lightweight as possible, it doesn't blindly copy the entire directory every time you commit. It can (when possible) compress a commit as a set of changes, or a "delta", from one version of the repo to the next.
> Git also maintains as history of which commits were made when. That's why most commits have ancestor commits above them -- we designate this with arrows
> - `-m "Commit Message"`:  Adds a message to the commit (should be written in present tense)

> [!success]- `git log`
> Show the commits

> [!success]-  `git diff <file>`
> Shows the changes between the file and it's last committed version

> [!success]- `git checkout <file>`
> Rollback to last position in local repo 

> [!important]- .gitignore
> List the files you want to ignore. One per line.
> - `#` for comments
> - `*.extension`: all files with the specified extension
> - The git team have helpfully put a template together for python: [Python.gitignore](https://github.com/github/gitignore/blob/main/Python.gitignore)

# Remote (GitHub) Commands

> [!success]- `git remote add <name> <url>`
> Create remote repository

> [!success]- `git branch -M main`

> [!success]- `git push -u origin main`
> Pushes local repo to remote repo (-u links up the repos)

> [!success]- `git clone <url>`
> Make a copy (fork) of a remote repo onto your own local environment
> e.g. self-hosting applications (like obsidian!)
> **Note:** is this what Assystem did for superset and budibase? 

> [!question] DS_Store (mac only)
> Stores personal preferences for things like folder layouts. Users don't really want this. 

# Branching and Merging

Branches are pointers to a specific commit, nothing more. A branch essentially says "I want to include the work of this commit and all parent commits."

> [!quote] Branch early, and branch often

Because there is no storage/memory overhead with making many branches, it's easier to logically divide up your work than have big beefy branches.


![[Feature Development with Branches.png|200]]

> [!success]- `git branch`
> For when you are fixing bugs, creating new features. Then merge and check for conflicts.
> - `git branch <name-of-branch>` create a new branch
> 
>> [!note] In Git version 2.23...
>> A new command called `git switch` was introduced to eventually replace `git checkout`, which is somewhat overloaded (it does a bunch of different things depending on the arguments). You can still use `checkout` instead of `switch` because the `switch` command is still considered experimental and the syntax may change in the future. However you can still try out the new `switch` command in this application, and also [learn more here](https://git-scm.com/docs/git-switch).

> [!success]- `git checkout <branch>`
> switch to specified branch

> [!success]- `git checkout -b <branch>`
> Create a new branch and switch to it

> [!success]- `git merge <branch-name>`
> ![[Branching Example.png| 150]]
> A special commit that has two unique parents (i.e. "I want to include all the work from this parent over here and this one over here, *and* the set of all their parents".)

# Forking and Pull Requests
Forking copies a repository to your own GitHub account, you can then clone it to get it to your local account.

Pull requests are basically saying "would you consider adding this?" If you are not the owner (or have write access) to the remote repo, to merge with the original repo, then you make a pull request so the owner can accept your changes

<hr />

```dataviewjs
dv.view("customJS/navPY")
```