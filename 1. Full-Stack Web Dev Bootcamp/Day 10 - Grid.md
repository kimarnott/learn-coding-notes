---
tags:
  - day
  - web-dev/css/grid
order: 10
aliases:
  - 10. Grid
  - grid
complete: true
---
- [x] Concept
- [ ] Capstone
- [ ] Portfolio


# General

While Flexbox is generally very useful for 1D layouts, Grid allows you to lay things out in a 2D layout. You can mix and match flex and grid to get the layout you want.

The main thing of note is that grid will create a grid in 2D, while flex will respect the justify-content property you set. I reckon that grid is about alignment, while flex is about spacing. 

You wrap the bits you want to use grid on in a container. You set the display property of that _container_ as `grid`. The width of everything in the grid container will be determined by css-grid, overwriting the default properties. The flex container takes the full width of the screen, but you can also set a container to be `inline-flex`, which lets the container take as much room as it needs, but also allows other blocks to join on the same line, if there's space.

[[grid-cheatsheet.png| Open Full-Screen]]
![[grid-cheatsheet.png]]
[Full Details at css-tricks.com](https://css-tricks.com/snippets/css/complete-guide-grid/)

> [!tip]+ Grid sizing
> Set the grid template rows/columns. Items will automatically fill the template.
> - 100px | 1rem etc.
> 	- This is *fixed* sizing, and not responsive to the screen size
> - auto
> 	- Row: This will make it so the column will try to fit 100% of the viewport width
> 	- Column: This will adjust the row height to fit the content
> - 1fr 2fr etc.
> 	- This is a fractional unit. This will keep the ratios the same across the rows/columns.
> - minmax(400px, 800px)
> 	- Usually applied to template-columns (the rows)
> 	- Useful for when you want to limit the size of the content, e.g. for an image
> - repeat(2, 200px)
> 	- The above will define a row/column as 2 x 200px, or 200px 200px;
> - grid-auto-rows: 300px;
> 	- This defines the sizing of any additional items that do not fit in the defined template.
> 	- In this example, any new rows will have a height of 300px.
> 	
> If you don't template enough rows/columns, grid will automatically align the row width, and make the height fit the content.

>[!tip]+ Grid Placement
>You can set how much space (rows/columns) you want each item in the grid to take up
>- grid-column: span 2
>	- This will make the item span 2 columns, starting from where it would usually start
>The is actually a shorthand for two properties for grid-column/row
>- -start/end: 2
>	- This will make the item start/end at a particular line 
>		- if you count from the left, numbers are positive
>		- if you start from the right, the numbers are negative
>	- For clarity, its better to use positive values, using -1 (the far right) is the exception
>- -end: auto
>	- This will either be 1, or the start plus the span length
>	
>You can start and end wherever you want (e.g. start: 4, end: 1 is the same as start: 1, end: 4)
>
>There's also an order property you can set on an item, which defines order using relative numbers (highest number last)

>[!note] Overlap
>You can overlap in grid!

<hr />

```dataviewjs
dv.view("customJS/navWD")
```
