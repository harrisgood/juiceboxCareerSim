require('dotenv').config()
const apiRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

///////////////////////////////////////
//// ACCESSIBLE TO ANYONE FUNCTIONS ///
///////////////////////////////////////

// GET posts - get all posts
apiRouter.get("/posts", async (req, res, next) => {
  try{
    const posts = await prisma.post.findMany()
    res.send(posts)
  }catch (error){
    console.log(error)
    next(error)
  }
})

// GET post id - get post by specific id
apiRouter.get("/posts/:id", async (req, res, next) => {
  try{
    const foundPost = await prisma.post.findUnique({
      where: {
        id: req.params.id * 1
      },
    })
    res.send(foundPost)
  }catch (error){
    console.log(error)
    next(error)
  }
})


////////////////////////////////
/////// AUTH FUNCTIONS /////////
////////////////////////////////

// authorize user for the following endpoints if they are logged in
apiRouter.use((req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    req.user = null;
  }
  next();
});

//POST- create a new post as currently logged in user
apiRouter.post("/posts", async (req, res, next) => {
  if (!req.user) {
    return res.status(401).send("You must be logged in to do that.");
  }
  try{
    console.log("req: ", req)
    const newPost = await prisma.post.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        userId: req.user.id
      }
    })
    if(newPost){
      res.send(newPost)
    }else {
      res.send("failed to post")
    }
  }catch (error){
    console.log(error)
    next(error)
  }
})

// PUT - update a post only if it was created by logged in user
apiRouter.put("/posts/:id", async (req, res, next) => {
  if (!req.user) {
    return res.status(401).send("You must be logged in to do that.");
  }
  try{
    const updatedPost = await prisma.post.update({
      where: {
        id: req.params.id * 1,
        userId: req.user.id
      },
      data: {
        id: req.params.id * 1,
        title: req.body.title,
        content: req.body.content,
        userId: req.user.id
      },
    })
    if(updatedPost){
      res.send(updatedPost)
    }else{res.send("failed to update post")}
  }catch (error){
    console.log(error)
    next(error)
  }
})

// DELETE - delete a post only if it was created by logged in user
apiRouter.delete("/posts/:id", async (req, res, next) => {
  if (!req.user) {
    return res.status(401).send("You must be logged in to do that.");
  }
  try{
    const postToDelete = await prisma.post.delete({
      where: {
        id: req.params.id * 1,
        userId: req.user.id
      },
    })
    if(postToDelete){
      res.send(postToDelete)
    }else{
      res.send("failed to delete")
    }
  }catch (error){
    console.log(error)
    next(error)
  }
})

module.exports = apiRouter