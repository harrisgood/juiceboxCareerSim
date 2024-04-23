require('dotenv').config()
const apiRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()


///////////////////////////////////////
//// ACCESSIBLE TO ANYONE FUNCTIONS////
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



///////////////////////////////////////
//// AUTH FUNCTIONS///////////////
///////////////////////////////////////

//POST- create a new post as currently logged in user
// apiRouter.post("/posts", async (req, res, next) => {
//   try{

//   }catch (error){
//     console.log(error)
//     next(error)
//   }
// })

// PUT - upate a post only if it was created by logged in user

// apiRouter.put("/posts/:id", async (req, res, next) => {
//   try{

//   }catch (error){
//     console.log(error)
//     next(error)
//   }
// })

// DELETE - delete a post only if it was created by logged in user

// apiRouter.delete("/posts/:id", async (req, res, next) => {
//   try{

//   }catch (error){
//     console.log(error)
//     next(error)
//   }
// })

module.exports = apiRouter