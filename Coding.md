---
cssclasses:
  - content-page
---
# Python

```dataview
TABLE WITHOUT ID
complete_box as "",
link(file.link, aliases[0]) AS "100 Days of Code: The Complete Python Pro Bootcamp"
FROM "1. 100 Days of Python" and #day 
FLATTEN choice(complete, "☑️", "❌") as complete_box
SORT order ASC
```

# Web Dev

```dataview
TABLE WITHOUT id 
complete_box AS "",
link(file.link, aliases[0]) AS "The Complete Full-Stack Web Development Bootcamp"
FROM "1. Full-Stack Web Dev Bootcamp" and #day
FLATTEN choice(complete, "☑️", "❌") as complete_box
SORT order ASC
```


# Packages

```dataview
TABLE WITHOUT id
complete_box AS "",
file.link AS "Python"
FROM "1. Packages" and #python
FLATTEN choice(complete, "☑️", "❌") as complete_box
SORT file.name ASC
```

```dataview
TABLE WITHOUT id
complete_box AS "",
file.link AS "Web Dev (JavaScript)"
FROM "1. Packages" and #web-dev
FLATTEN choice(complete, "☑️", "❌") as complete_box
```