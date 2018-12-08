const supertest = require('supertest')
const { app, server } = require('../index')
const User = require('../models/user')
const { format, initialBlogs, blogsInDb, usersInDb, aToken } = require('./test_helper')
const api = supertest(app)
//const Blog = require('../models/blog')


describe('** /api/users test cases **', async () => {

  beforeAll (async () => {

    await User.remove({})
    const user = new User({ username: 'root', password: 'sekret' })
    //user.blogs.concat(blogObject)
    await user.save()

  })

  test('POST /api/users succeeds with a fresh username', async () => {
    const usersBeforeOperation = await usersInDb()

    //console.log('Ennen lista: ', usersBeforeOperation)

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }


    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await usersInDb()

    //console.log('Afteri: ', usersAfterOperation)

    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
    const usernames = usersAfterOperation.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'mahoton',
      adult: true
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)


    expect(result.body).toEqual({ error: 'username must be unique' })

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })

  test('POST /api/users fails with proper statuscode if pwd too short', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'groot',
      name: 'sogroot',
      password: 'so'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log('result: XXXX', result.body)

    expect(result.body).toEqual({ error: 'Password is too short , should be >3' })

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })

  test('POST /api/users valid without adultness', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'strange',
      name: 'Dr. Strange',
      password: 'sostrange123'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body.adult).toEqual(true)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
  })

  afterAll (() => {
    server.close()
  })

})

