require('dotenv').config()
const authRouter = require("express").Router()
// const db = require("../db")
const jwt = require("jsonwebtoken")
const { PrismaClient } = require("@prisma/client")
const express = require("express")
const prisma = new PrismaClient()


// POST register - create user with provided credentials and return a token
authRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = await prisma.users.create({
      data: {
        username: req.body.username,
        password: req.body.password
      },
    })

    let token = null
    if(newUser){
      token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET)
      res.send({
        message: `Welcome to juicebox, ${req.body.username}!`,
        token: token
      })
    }else{
      res.send({
        message: "failed to create user"
      })
    }
  }catch (error) {
    console.log(error)
    next(error)
  }
})

// POST login - log in with provided credentials and provide a token
authRouter.post("/login", async (req, res, next) => {
  try {
    const userLoggingIn = await prisma.users.findUnique({
      where: {
        username: req.body.username,
        password: req.body.password
      },
    })
    let token = null
    if(userLoggingIn){
      token = jwt.sign({ id: userLoggingIn.id }, process.env.JWT_SECRET)
      res.send({
        message: `Welcome back to juicebox, ${req.body.username}!`,
        token: token
      })
    }else{
      res.send({
        message: "incorrect username or password"
      })
    }
  }catch (error){
    console.log(error)
    next(error)
  }
})


module.exports = authRouter