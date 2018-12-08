import React from 'react'
import '../index.css'

//  {  console.log('Blogi:',blog.title, '-url-:', blog.url) }


const FullBlog = ({blog, adder, fu1, fu2}) => (
    <div className="blogbody">
        <a target="_new" href="`blog.url`">{blog.url}</a>
        <form onSubmit={fu2}>
        {blog.likes} likes <button>like</button><br/>
        </form>
    added by !!!{blog.user} .!!!
    </div>
)

export default FullBlog


/*
  <div key={blog.id} onClick={fu1}>
    <div className="blogheader">{blog.title} by {blog.author}</div>

    */