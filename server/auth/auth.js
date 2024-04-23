require('dotenv').config()
const authRouter = require("express").Router()
// const db = require("../db")
const jwt = require("jsonwebtoken")
const { PrismaClient } = require("@prisma/client")
const express = require("express")
const prisma = new PrismaClient()
const { JWT = JWT_SECRET } = process.env

authRouter.post("/register", async (req, res, next) => {
  console.log("inside post")
  try {
    const newUser = await prisma.users.create({
      data: {
        username: req.body.username,
        password: req.body.password
      },
    })
    console.log("newUser: ", newUser)
    let token = null
    if(newUser){
      token = jwt.sign({ id: newUser.id }, process.env.JWT)
      res.send({
        message: `Welcome to juicebox, ${req.body.username}!`,
        token: token
      })
    }else{
      res.send({
        message: "failed to create user"
      })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = authRouter