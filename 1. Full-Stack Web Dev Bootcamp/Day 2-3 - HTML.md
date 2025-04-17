---
tags:
  - day
  - web-dev/html
order: 2
aliases:
  - 2-3. HTML
complete: true
---
- [x] Concept
- [ ] Capstone
- [ ] Portfolio

# General

HTML: HyperText Markup Language

HTML defines content and structure of a website.

HyperText: Text that can link to other documents in the website (Hyperlinks)
Markup Language: Grammar, spacing etc. using tags (anything inside the angle brackets)
![[HTML Tags.png]]

# HTML Attributes

```html
<tag attribute=value> <!-- opening tag contains the tag type and attributes -->
Content <!-- content you want to display -->
</tag> <!-- closing tag -->
```

You can have multiple attributes, just separate them with a space.

> [!tip] Global vs Specific
> - Some attributes are 'global' - they are available to all elements
> - Others are 'specific' - they can only be used by certain elements


> [!success] Important Attributes
> These don't have any affect on the HTML, but are important for styling.
> 
> ```html
> <h2 class="red-text">A way of grouping elements</h2>
> 
> <h2 id="red-text">A way of singling out one element.</h2>
> <p id="blue-text">No more than one ID of each type per page.</p>
> <p id="green-text">Avoid if possible.</p>
>
> <div></div> <!-- Content division element, completely invisible -->
> <span></span> <!-- Content division element, usually within a piece of text -->
> ```

# Headings

```html
<h1>Level 1 Heading</h1>
<h2>Level 2 Heading</h2>
```

Headings exist from `<h1>` to `<h6>`. Its *extremely* unlikely that you'll need a heading beyond this, but if you do, you tend to use a different type of tag.


> [!tip] Best Practise
> - There should be *one* h1 in each document
> - Don't skip between heading levels. So, ``h1 first, then h2, then h3, etc. 
> 	- *Not*: h1, h4, h6 etc

More on heading elements: [Heading Elements (MDN Docs)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements)

# Paragraph
Plain text will render on the same line, the paragraph tag separates them out as you would expect. The p tag is very important as screen readers can use these tags to navigate through the document.

```html
<p>This is a paragraph</p>
<p>This is a paragraph</p>
```

# Void Elements
You are forbidden from putting content in a void element. Think of it as a combination of both opening and closing tags.

```html
<hr /> <!-- Produces a horizontal rule (line) across the page -->
<br /> <!-- A line break (not a new paragraph), use for addresses, poem etc -->
```


> [!tip] Best Practise
> Do not use break elements for new paragraphs, it makes your code less accessible.
> 
> You don't need to put the `/` in void elements, but it's easier to see that the tag is self-closing (void) if it is there.

# Lists

```html
<!-- ordered (numbered) list -->
<ol> 
  <!-- list items -->
  <li>First</li>
  <li>Second</li>
  <li>Third</li>
</ol>

<!-- unordered (bullet point) list -->
<ul>
  <li>Milk</li>
  <li>Eggs</li>
  <li>Flour</li>
</ul>

```

More about lists: [List (MDN Docs)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li)

# Nesting and Indentation

Indentation is not strictly necessary, but very important for you (as a developer) to see what's going on in your code.

![[The Importance of Nesting.png|400]]

# Anchor Elements

```html
<a href="https://www.google.com">This is a link</a>
```

You specify the target webpage in the 'href' attribute.

More on anchor elements [Anchor Elements (MDN Docs)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a)

# Image Elements 

```html
<!-- the img tag renders an image from the location) -->
<img src="url" alt="Alternative text description"/>
```

Note that this is a void element (self-closing tag).

The alt attribute provides text for tools that help people with visual impairments. A screen reader will use this text to describe the image to the user.

<hr />

```dataviewjs
dv.view("customJS/navWD")
```