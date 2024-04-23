const apiRouter = require("express").Router()
// const db = require("../db")
cpmst 

router.post("/auth/register", async (req, res, next) => {
  const { username, password } = req.body
  try {
    await prisma.post.create({
      data: {
        username: username,
        password: password,
      },
    })
  } catch (error) {
      next(error)
  }
  res.json([username, password])
})

module.exports = apiRouter