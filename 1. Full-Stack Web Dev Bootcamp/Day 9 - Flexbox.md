---
tags:
  - day
  - web-dev/css/flex
order: 9
aliases:
  - 9. Flexbox
  - flexbox
  - flex
complete: true
---
- [x] Concept
- [ ] Capstone
- [ ] Portfolio


# General

You wrap the bits you want to use flex on in a container. You set the display property of that *container* as `flex`. The width of everything in the flex container will be determined by flexbox, overwriting the default properties. The flex container takes the full width of the screen, but you can also set a container to be `inline-flex`, which lets the container take as much room as it needs, but also allows other blocks to join on the same line, if there's space.

[[flexbox-cheatsheet.png|Open Full-Screen]]
![[flexbox-cheatsheet.png]]
[Full Details at css-tricks.com](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

>[!tip]+ Flex sizing
>- If you don't want the items to grow/shrink above the max/min, you can set flex-grow/shrink to 0. The default is:
>	- `flex-shrink: 1;`
>	- `flex-grow: 0;`
>- To set these in one: `flex: 1 1 0` (grow: 1, shrink:1, basis: 0)
>	- This can be shortened even further with `flex: 1`
>	- The number denotes the ratio of space you want the item to take up (e.g. `flex: 2` will be twice the size of `flex: 1`)


<hr />

```dataviewjs
dv.view("customJS/navWD")
```