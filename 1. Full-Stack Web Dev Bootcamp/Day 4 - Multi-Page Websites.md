---
tags:
  - day
  - web-dev
order: 4
aliases:
  - 4. Multi-Page Sites
complete: true
---
- [x] Concept
- [x] Capstone
- [ ] Portfolio

# General

> [!tip]+ Absolute File Path
> Relative to the root of the computer (eg. Your c drive, C:)

> [!tip]+ Relative File Path
> Relative to your (code's) current location. 
> 
> We will tend to use this, as we won't need to rewrite file paths if we decide to move the project folder to another location (which would break the absolute file path)
> 
> Relative file path special characters:
> - ../
>	- Look for a file/folder in a folder one level up
> - ./
>	- Look for a file in the current directory (folder)

> [!note]+ A note about website folder layouts
> Usually, the layout is usually
> - 📁 Project
> 	- 📃index.html
> 	- 📃page.html
> 	- 📁 assets
> 		- 📁 images
> 			- 🖼️ picture.png
# HTML Boiler Plate

```html
<!DOCTYPE html> 
<html lang="en"> 
<head>   
    <meta charset="UTF-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>Document</title> 
</head>
<body> 

</body>
</html>
```

> [!note]- See Commented Version
>```html
><!-- this tells the browser that we're using HTML5 -->
><!DOCTYPE html> 
><!-- html: root of the document, everything goes inside. lang: language of the text elements, en=english -->
><html lang="en"> 
>
><!-- import info about our website (not displayed to user. No content) -->
><head>   
>    <!-- character set encoding -->
>    <meta charset="UTF-8"> 
>
>	<!-- defines how to display the website when it first opens -->
>    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
>    
>    <!-- displayed in the tab bar -->
>    <title>Document</title> 
></head>
>
><!-- The website content goes in here -->
><body> 
>
></body>
></html>
>```

# Capstone Project 1 - Online Resume

1. Create an HTML file named `index.html`.
2. Use the `<!DOCTYPE html> declaration at the beginning of the file to indicate that it's an HTML document. 
3. Create a `**head**` section that includes a `title` element with the text "My Resume".
4. Inside the `body` section, write HTML code to create an online resume covering the following aspects:
    - **Summary** or objective statement
    - **Education** (list degrees, schools, and dates)
    - **Work experience** (list job titles, employers, dates, and responsibilities)
    - **Skills** (list relevant skills or areas of expertise)
    - Awards, certifications, or other achievements (list any relevant awards, certifications, or other accomplishments)
5. Use appropriate HTML tags to format the content of each section, such as `h1` for section headings and `ul` or `ol` for lists.
6. Use HTML tags to add a **profile photo** of yourself.
7. Use relevant anchor tags to create a multi-page website, listing other aspects of your resume such as **Hobbies** and **Contact** details.
8. Add a `footer` element with your name and any copyright information or other disclaimers. (Hint: use the MDN docs for things you don't know how to do: [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer)
9. Save the `index.html` file and open it in a web browser to ensure that it displays correctly.
10. Add your website to your GitHub to start building your portfolio.
11. Publish your website using GitHub pages and share it here (in the Q&A) with other students.
12. Comment and make suggestions to other students' projects.

<hr />

```dataviewjs
dv.view("customJS/navWD")
```