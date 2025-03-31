const express = require("express");
const app = express();
const path = require('path');
const port = 8080;

// Importing the required modules
const { v4: uuidv4 } = require('uuid'); // Fixed import
const methodOverride = require('method-override')// Fixed import
app.use(methodOverride('_method'));

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.listen(port, () => {
  console.log("server start listening");
});

const posts = [
  { id: uuidv4(), title: "@aman", content: "i love studying science" },
  { id: uuidv4(), title: "@shubham", content: "i love studying chemistry" },
  { id: uuidv4(), title: "@rahul", content: "i love studying biology" },
  { id: uuidv4(), title: "@sam", content: "i love studying scientific facts" }
];

// All posts funcitonality
app.get("/posts", (req, res) => {
  res.render('index.ejs', { posts });
});

// New post functionality
app.get("/posts/new", (req, res) => {
  res.render('new.ejs');
});

app.post('/posts', (req, res) => {
  const { username, content } = req.body;
  const post = { id: uuidv4(), username, content }; // Added id
  posts.push(post);
  res.redirect('/posts');
});

// Show button
app.get('/posts/:id', (req, res) => {
  const { id: tag } = req.params;
  const post = posts.find(p => p.id == tag);
  res.render('PostDetail.ejs', { post });
});

// Edit button functionality
app.get('/posts/edit/:id', (req, res) => {
  const { id } = req.params;
  const post = posts.find(p => p.id === id);
  res.render('edit.ejs', { post });
});

app.patch("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { content } = req.body; // Fixed to use req.body
  const post = posts.find(p => p.id === id);
  if (post) {
    post.content = content;
  }
  res.redirect('/posts');
});

//delete a post
app.get('/posts/del/:id', (req, res) => {
  const { id } = req.params;
  const post = posts.find(p => p.id === id);
  res.render('remove.ejs', { post });
});
app.delete('/posts/del/:id',(req,res)=>{
  const {id} =req.params;
  const post = posts.find(p => p.id === id);
  if (post){
    const index = posts.indexOf(post);
    posts.splice(index,1);
  }
  res.redirect('/posts');
})