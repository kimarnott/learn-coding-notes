const currFile = dv.current().file

// Fetch all notes ordered by date
const pages = await dv.pages('"1. Full-Stack Web Dev Bootcamp"')
  .sort ( p => p.order )
  
// Variables used when looking for previous and next links
let thisPrevious = null
let thisNext = null
let previous = null   // Intermediate candidate for previous link
let previousAlias = null
let nextAlias = null

// Loop through looking for next and previous links
for (let page of pages) {

  if (previous && (page.file.path === currFile.path) ) {
    thisPrevious = previous.file
    previousAlias = previous.file.aliases?.[0] || previous.file.name
  } 

  if (previous && (previous.file.path === currFile.path) ) {
    thisNext = page.file
    nextAlias = page.file.aliases?.[0] || page.file.name
    break
  }
  
  // We've not found both, so update previous candidate
  // and lets loop again
  previous = page 
}


// Output the links
my_span = dv.span([
    thisPrevious ? "<span class='nav'>" + dv.func.link(thisPrevious.link, previousAlias) + "</span>" : "<span class='nav'>No previous</span>",
    "<span class='this-file'>" + currFile.name + "</span>",
    thisNext ? "<span class='nav next'>" + dv.func.link(thisNext.link, nextAlias) + "</span>": "<span class='nav next'>No next</span>"
  ].join("") )
 
dv.container.classList.add("scene-navigation")