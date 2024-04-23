require('dotenv').config()

const { PORT = 3000 } = process.env
const express = require('express')
const server = express()

// Body parsing middleware
const bodyParser = require('body-parser')
server.use(bodyParser.json)
// cant decide which to use yet lol
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const morgan = require('morgan');
server.use(morgan('dev'));

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

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

server.use("/auth", require("./auth/auth.js"))
// server.use("/api", require("./api/apirouter.js"))

server.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).send(err.message || "Internal server error")
})

server.use((req, res) => {
  res.status(404).send("Path not found")
})

server.listen(PORT, () => {
  console.log(`istening on port ${PORT}`)
})