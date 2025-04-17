---
tags:
  - day
  - web-dev
order: 29
aliases:
  - 29. Public API Capstone
complete: true
---
- [ ] Concept
- [x] Capstone
- [ ] Portfolio

# General
In this project, students are expected to build a website using the Express/Node.js platform, with the Axios HTTP client, that integrates a chosen public API from the given list: [**Public API Lists**](https://github.com/appbrewery/public-api-lists). The website should interact with the chosen API, retrieve data, and present it in a user-friendly manner.
- Develop an understanding of how to integrate public APIs into web projects.    
- Gain practical experience using Express/Node.js for server-side programming.    
- Enhance understanding of client-server communication using Axios.    
- Demonstrate ability to manipulate, present, and work with data retrieved from APIs.

Fine, but the DnD API I chose is pretty rough. I guess I'm too used to relational data, JSONs are bloody awful for trying to build a template around. I'm in a bad mood anyway - maybe I'll come back and use a simpler API.
# My Solution
JS:
```js
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

  
const app = express();
const port = 3000;
const MONSTER_API_URL = "https://www.dnd5eapi.co/api/2014/monsters";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public") )

let monsterList = []

app.get("/", async (req, res) => {
    res.render("index.ejs");
})
  
app.get("/monsters", async (req, res) => {
    if (Object.keys(monsterList).length < 1) {
        console.log("Getting data...")
        for (let i=0; i<cR.length; i++) {
            const response = await axios.get(MONSTER_API_URL + `?challenge_rating=${cR[i]}`)
            monsterList[i] = response.data.results;
        }
    }
    res.render("monsters.ejs", {data: monsterList, challenge: cR});    
})
  
app.get("/monster/:index", async (req, res) => {
    const reqMonster = req.params["index"];
    console.log(reqMonster)
    const response = await axios.get(MONSTER_API_URL + "/" + reqMonster);
    res.render("monster.ejs", {data: response.data});
})
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
  
const cR = [0, 0.25, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 24, 30]
```

```html
<!-- Homepage -->
<%- include("partials/header.ejs") %>
  
<div>
    <img src="images/home-bg.jpg" alt="d20 Picture" class="img-fluid" loading="lazy">
    <p class="photo-caption">Photo by <a href="https://unsplash.com/@galxrax?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">galxrax rax</a> on <a href="https://unsplash.com/photos/a-close-up-of-a-dice-on-a-table-oGAf4jsC0Fw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
    </p>
</div>
  
<div class="text-center">
    <h1>DND Capstone Project</h1>
</div>
    
<%- include("partials/footer.ejs") %>


<!-- Monsters.ejs (list of monsters from the api-->

<%- include("partials/header.ejs") %>
  
   <div class="container my-5">
    <h1><%= data.name %></h1>
    <p><%= data.size %> <%= data.type %></p>
    <p>Alignment: <%= data.alignment %></p>
    <p>HP: <%= data.hit_points %> (<%= data.hit_points_roll %>)</p>
    <% if (locals.data.image) { %>
      <img class="monster-pic" src="https://www.dnd5eapi.co<%= data.image %>">
    <% } %>
    <p><%= data.desc %></p>
   </div>
  
<%- include("partials/footer.ejs") %>



```

> [!tip]+ Packages
> - [[Express]]
> - [[Axios]]
> - [[Body Parser]]


# Requirements and Solutions

>[!note] Requirements
> #### 1. API Choice
> - Browse through the [provided list](https://github.com/appbrewery/public-api-lists) and choose an API of interest. This choice should be guided by the potential to retrieve, manipulate, and present data in a meaningful and interactive way. I recommend choosing an API that does not require authentication and is CORS enabled. ([What is CORS?](https://medium.com/@electra_chong/what-is-cors-what-is-it-used-for-308cafa4df1a))    
> 
> #### 2. Project Planning
> - Think through your project, researching the chosen API, its features, what data it will provide, and how it will be used in your web application.    
> 
> #### 3. Project Setup
> - Set up a new Node.js project using Express.js.    
> - Include Axios for making HTTP requests.    
> - Include EJS for templating.    
> - Ensure that the project has a structured directory and file organization.    
> 
> #### 4. API Integration
> - Implement at least a GET endpoint to interact with your chosen API.    
> - Use Axios to send HTTP requests to the API and handle responses.    
> 
> #### 5. Data Presentation
> - Design the application to present the retrieved data in a user-friendly way. Use appropriate HTML, CSS, and a templating engine like EJS.    
> 
> #### 6. Error Handling
> - Ensure that error handling is in place for both your application and any API requests. You can console log any errors, but you can also give users any user-relevant errors.    
> 
> #### 7. Documentation
> - Include comments throughout your code to explain your logic.    
> 
> #### 8. Code Sharing
> - Use what you have learnt about GitHub to commit and push your project to GitHub so that you can share it with other students in the Q&A area, I'd love to see what you've build too! You can tweet at me @yu_angela    
> - Include a Readme.md file that explains how to start your server, what commands are needed to run your code. e.g. `npm i`  and then `nodemon index.js`




<hr />

```dataviewjs
dv.view("customJS/navWD")
```