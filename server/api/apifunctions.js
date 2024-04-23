const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()


///////////////////////////////////////
//// ACCESSIBLE TO ANYONE FUNCTIONS////
///////////////////////////////////////

// GET posts - get all posts
const getAllPosts = async () => {

}


// GET post id - get post by specific id
const getPostById = async (postId) => {

}



///////////////////////////////////////
//// AUTH FUNCTIONS///////////////
///////////////////////////////////////

//POST- create a new post as currently logged in user
const createNewPost = async ({ title, content, userId }) => {
  co
  if(loggedIn){
    const newPost = await prisma.post.create({
      data: {
        title: title,
        content: content,
        userId: userId
      }
    })
  }else{
    return "You must be logged in to create posts"
  }

}

// PUT - upate a post only if it was created by logged in user

const updatePost = async (postId) => {

}

// DELETE - delete a post only if it was created by logged in user

const deletePost = async (postId) => {

}