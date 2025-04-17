---
tags:
  - day
  - web-dev/css/bootstrap
order: 11
aliases:
  - 11. Bootstrap
  - Bootstrap
complete: true
---
- [x] Concept
- [ ] Capstone
- [ ] Portfolio

# General

Bootstrap is a CSS Framework (pre-built CSS files that mean you can simply include certain classes to get the look you want).

>[!success] When to use
>Mobile first, responsive website that you want to deploy quickly

>[!failure] When not to use
>For very simple websites, or something very complex and want custom design

The easiest way to include bootstrap is is through a CDN (Content Deliver Network) - which simply means that the files are located globally and users can download the files from their nearest server.

[Get Bootstrap](https://getbootstrap.com/)

```html
<!-- Add CSS link just before the header closing tag
Make sure its before any of your styling!(so yours overwrites bootstrap) -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet" 
integrity="sha384-gOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossorigin="anonymous"> 

<!-- Add the JavaScript link right at the end of your html page
Just before the closing html tag -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js" integrity="sha384-6d4wzSIapyDyv1kpU366/PK5hCdSbCRGRCMv+eplOQJWyd1fbcAu9OCUj5zNLiq" crossorigin="anonymous">
</script>
```

Read the [docs](https://getbootstrap.com/docs/5.3/getting-started/introduction/), they're pretty comprehensive.

Bootstrap containers are split into 12 columns with pre-defined break points. Within each container, you put each row in another container with class 'row'. 

You use classes to define the sizing and behaviour you want.

W3schools has a bunch of bootstrap templates -> [Here](https://www.w3schools.com/bootstrap/bootstrap_templates.asp)


<hr />

```dataviewjs
dv.view("customJS/navWD")
```