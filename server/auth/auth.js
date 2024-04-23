const authRouter = require("express").Router()
// const db = require("../db")
const jwt = require("jsonwebtoken")

authRouter.post("/register", async (req, res, next) => {
  console.log("inside post")
  const { username, password } = req.body
  try {
    const newUser = await prisma.post.create({
      data: {
        username: username,
        password: password,
      },
    })
    res.send({
      message: `Welcome to juicebox, ${username}!`
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = authRouter


// server.use((req, res, next) => {
//   const auth = req.headers.authorization;
//   const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

//   try {
//     req.user = jwt.verify(token, process.env.JWT);
//   } catch {
//     req.user = null;
//   }

//   next();
// });