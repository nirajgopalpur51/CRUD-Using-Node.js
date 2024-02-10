const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");

const { v4 : uuidv4 } = require('uuid'); //Use for unique id


app.use(express.urlencoded({extended : true})); 
app.use(methodOverride("_method"))

app.set("views engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id : uuidv4(),
        username : "Niraj",
        content : "He is a good boy"
    },
    {
        id : uuidv4(),
        username : "Raj",
        content : "He is a good boy"
    },
    {
        id : uuidv4(),
        username : "Kumar ",
        content : "Got selected"
    },
]

app.get("/posts",(req,res) => {
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res) => {
    res.render("new.ejs")
});

app.post("/posts",(req,res) =>{  //when submit the form
    let {username,content} = req.body;
    let id = uuidv4();   
    posts.push({id,username,content}); //Add in all the post array
    res.redirect("/posts");  //to go homepage by get request by default 
})

app.get("/posts/:id",(req,res) =>{  //when submit the form
   let {id} = req.params;
   let post = posts.find((p) => id === p.id);
   res.render("show.ejs",{post});
})

app.patch("/posts/:id",(req,res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

app.listen(port,()=>{
    console.log("listening to port : 8080");
})

