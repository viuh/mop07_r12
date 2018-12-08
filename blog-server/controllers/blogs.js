const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const formatBlog = (blog) => {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    id: blog._id,
    user: blog.user
  }
}


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username:1, name:1, id:1 })

  response.json(blogs.map(Blog.format))
})


blogsRouter.get('/:id', async (request, response) => {

  try {
    const blog = await Blog.findById(request.params.id)


    if (blog) {
      response.json(Blog.format(blog))
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    //console.log(exception)
    response.status(400).json({ error: 'something went weird at get id' })
  }

})

blogsRouter.delete('/:id', async (request, response) => {

  try {
    const id = request.params.id

    const token = request.token

    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    //user should contain info of his|her blogs.
    let theblog = await Blog.findById(id)

    //console.log('Owner of blog: '+ theblog.user.toString() )
    //console.log('Request made by:'+ decodedToken.id )

    if ( theblog.user.toString() === decodedToken.id.toString() ) {
      console.log('Blog user == token user, can delete')
      await Blog.findByIdAndRemove(id)
      console.log('removal done for blog id: '+id)
      return response.status(204).end()
    } else {
      return response.status(403).json({ error: 'can only delete own blogs' })
    }

  } catch(exception) {
    //console.log(exception)
    response.status(400).send({ error: 'malformatted id:'+request.params.id })
  }
})



blogsRouter.post('/', async (request, response) => {

  const body = request.body

  try {
    const token = request.token
    //console.log('XXXX token?', token)
    //getTokenFrom(request)

    if (body.title === undefined || body.title === null || body.title === '') {
      return response.status(400).json({ error: 'Blog title missing' })
    }


    const decodedToken = jwt.verify(token, process.env.SECRET)


    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (body === undefined || (body.title === undefined && body.url === undefined )) {
      response.status(400).json({ error: 'title and url missing' })
    } else {

      let user = await User.findById(decodedToken.id)

      if (user === undefined || user===null) {
        //console.log('Last chance user PATH ')
        user = await User.findOne({})  // fixupper  TODO
      }

      console.log('UUUU: ', user)

      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user._id // 4.19
      })

      const savedOne = await blog.save()

      //+ käyttäjälle
      user.blogs = user.blogs.concat(savedOne._id)
      await user.save()

      response.json(Blog.format(blog))
    }
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError' ) {
      //console.log('JSon token error!!!!!')
      response.status(401).json({ error: exception.message })
    } else {
      //console.log('Blog post EXCP', exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }

})


blogsRouter.put('/:id' , async (request, response) => {

  console.log('Putti for ', request.params.id)
  try {

    const body = request.body

    const blog = {
      likes: body.likes === undefined ? 0 : body.likes
    }
    console.log('NEwer?', blog)
    let id = request.params.id

    const updatedOne = await Blog.findByIdAndUpdate( id
      , blog , { new: true }
    )
    updatedOne.save()
    response.json(updatedOne)
  } catch (exception) {
    //console.log(exception)
    response.status(400).json({ error: 'something went wrong...' + request.params.id })
  }

})




module.exports = blogsRouter


