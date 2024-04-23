const authRouter = require("express").Router()
// const db = require("../db")
const jwt = require("jsonwebtoken")
const { PrismaClient, Prisma } = require("@prisma/client")
const prisma = new PrismaClient()

authRouter.post("/register", async (req, res, next) => {
  console.log("inside post")
  try {
    await prisma.post.create({
      data: {
        username: req.body.username,
        password: req.body.password
      },
    })
    res.send({
      message: `Welcome to juicebox, ${req.body.username}!`
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