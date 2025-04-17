---
tags:
  - day
  - web-dev/css
order: 5
aliases:
  - 5-8. CSS
complete: true
---
- [x] Concept
- [ ] Capstone
- [ ] Portfolio


> [!success] **C**ascading **S**tyle **S**heet

# Inline

CSS goes into the opening tag of the element, eg.

```html
<html style="background:blue">
</html>
```


> [!tip] `style` attribute
> A global attribute (can be added to any html element)

These are useful for adding styling to a single element, but this quickly becomes tedious as your webpage gets larger. **Not recommended**.

# Internal
```html
<html>
  <head>
    <style>
        html { 
        background: red;
        }
    </style>
  </head>
</html>
```

Here the CSS is applied to the whole html file. The `html {}` is the selector, saying "for this element, apply the style in the `{}`".

For multipage website, you would have to write this out multiple times.

# External

Lives in a separate `styles.css` file. You link it to your html file(s).

In your HTML file (e.g. index.html):
```html
<html>
  <head>
    <link rel="stylesheet" href="./styles.css"/>
  </head>
</html>
```

In your CSS file (e.g. styles.css):
```css
html {
  background: green;
}
```

# CSS Selectors

```css 
/* By Element e.g. <h2>Red</h2> */
h2 {
  color: green;
}

/* By Class e.g. <h2 class="red">Red</h2>*/
/* perhaps the most useful */
.red {
  color: red;
}

/* By ID e.g. <h2 id="main">Blue</h2>*/
#main {
  color: blue;
}

/* By Attribute (values) e.g. <p draggable="true">Drag Me</p> */
p[draggable] {
  color: purple;
}

p[draggable="false"] {
  color: yellow;
}

/* Universal, selects everything */
* {
  color: black;
}
```

# Basic CSS Properties

```css
body {
  background-color: red;
  color: #ffff00; /* Font color */
  font-weight: bold; /* lighter or bolder (relative to parent), or 100-900 */
  font-size: 20px; /* 1px ~ 0.26mm, 1em = 100% of parent, 1rem = 100% of root */
  font-family: Helvetica, sans-serif; /* always use a back-up (after the ',') */
  font-family: "Times New Roman", serif; /* put multi word fonts in quotations*/
  text-align: center; /* or left, right, start, end, justify */
}
```

> [!success] Font Families
> 1. Copy links from google fonts and put them just before the end of the head section.
> 2. In the CSS, set the font-family to the correct value (given on google font, with a backup font)

# The Box Model

![[Box Model.png|400]]

```css
div {
  border: 30px solid black; /* ~Borders: thickness style color */
  padding: 100px; /* space inside the border, doesn't change the element size */
  margin: 50px; /* space outside the border, changes the element size */

  /* You can change each side of every property, eg. with border */
  border-top: 5px dotted blue; 
  border-bottom: 10px solid red;
  border-left: 2em dashed #ffff00;
  border-right: 1em groove green;
  border-width: 1px 2px 3px 4px; /* Top - Right - Bottom - Left*/
  border-width: 1px 2px; /* Top+Bottom - Right+Left*/
}
```

# What is Cascade Anyway?

>[!danger] Least important

1. Position ⏬
	1. Position in the style sheet (previous values are overwritten, lowest down wins) ⤵️
2. Specificity ⏬
	1. Elements ⤵️
	2. Class ⤵️
	3. Attribute ⤵️
	4. ID ⤵️
3. Type ⏬
	1. External Style Sheet ⤵️
	2. Internal Style Sheet ⤵️
	3. Inline Style ⤵️
4. `!important` (really try not to use this)

> [!success] Most important

# Combining CSS Selectors


> [!tip]+ Group
> This AND that
> ```css
> h1, h2 {
>   color: blueviolet;
> }

> [!tip]+ Child
> Direct descendant of the first, one generation deep
> ```css
> .my-div > div {
>   color: green;
> }
> ```

>[!tip]+ Descendant
> Descendant, any generation
> ```css
> .my-box li {
>   color: blue;
> }
> ```

>[!tip]+ Chaining
> Apply where ALL selectors are true. Put element selectors first for readability
> ```css
> h1#title.big.heading {
>   color: red;
> }
> ```

# CSS Position

> [!example] Static 
> Default value, normal HTML flow

> [!example] Relative 
> To its default position within normal HTML flow

> [!example] Absolute 
> Relative to the nearest positioned ancestor
>
> Top left of the webpage if no positioned ancestor

> [!example] Fixed 
> Relative to the top left of the browser window 
> 
> It won't move with scrolling

For relative, absolute, and fixed, use `top`, `left`, `bottom`, and `right` properties (one x-axis and one y-axis is enough) to define the position relative to the base (default position, nearest ancestor, or browser window).

> [!tip] Z-Index 
> Order of which elements appear on top 
> 
> Highest wins number wins
> 
> Can set to a negative value

# CSS Display

> [!tip]+ Block
> Most other elements have a display value of `block`, a full-width block. Two elements that have `display: block` will always appear on separate lines.

> [!tip]+ Inline
> The element will only take as much space as it needs on the page. The width and height is controlled by the content, and there is no way to change it.
> 
> Multiple elements with inline display will fill the available space before going to a new line.
> 
> The `span`element has this property by default.

> [!tip]+ Inline-Block
> A mix of both of the above. The block part lets you set the height and width. And the inline part means that these elements will appear in a row

> [!tip]+ None
> This hides the element.

>[!success] [[Day 9 - Flexbox|Flex]], [[Day 10 - Grid|Grid]], and [[Day 11 - Bootstrap|Bootstrap]] will be covered in Days 9-11


# CSS Float

Lets you wrap text around another element (typically an image). The float property is applied to the element you want to wrap text around (i.e. the image). You set the float to left or right, depending on which side you want the image to appear.

If you don't want a certain part of your site to *not* float around an image (e.g. a footer), you set its `clear` property to `left`, `right`, or more commonly, `both`.

# Media Queries

You want to make sure your layouts look good on any screen size. So we need different styling for different screen sizes. We target different screen sizes using media queries.

```css
@media (max-width: 600px) {
  /* CSS for screens below or equal to 600px wide */
}
```

You can also use `min-width`, or a combination of both, e.g. `@media (min-width: 600px) and (max-width: 900px`.

See more here: [Using Media Queries (MDN Docs)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries)

<hr />

```dataviewjs
dv.view("customJS/navWD")
```