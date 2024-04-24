const { faker } = require("@faker-js/faker")
const { PrismaClient } = require("@prisma/client")
const bcrypt = require('bcrypt')
const prisma = new PrismaClient()

const createUsersTable = async () => {
  for(let i = 0;i < 3;i++){
    await prisma.users.create({
      data: {
        username: faker.internet.userName(),
        password: await bcrypt.hash(faker.internet.password(), 10)
      }
    })
  }
}

const createPostTable = async () => {
  for(let i = 0;i < 9;i++){
    await prisma.post.create({
      data: {
        title: faker.word.words({ count: { min: 1, max: 5 } }),
        content: faker.word.words({ count: { min: 5, max: 25 } }),
        userId: (i % 3) + 1
      }
    })
  }
}

const seedData = async () => {
  await createUsersTable()
  await createPostTable()
}

seedData()