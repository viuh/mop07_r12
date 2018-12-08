import React from 'react'
import '../index.css'

const User = (username, name, blogsqty) => (
    <div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;"Blogs added"</div>
        <div key={username}>
            <div><a href="#blogcount">{name}</a> 0 </div>
        </div>
    </div>
)


export default User


  //onClick={fu1}>{blog.title}
/*
  <div key={blog._id} id="{blog._id}" name="blogcontent" classnxame="{classStyle}"
      className={tyyli({blog,visible, lastopened,clicksdone})} >
  <a target="_new" href="`blog.url`">{blog.url}</a>
  &nbsp;&nbsp;{blog.likes} likes <button className="likebutton" onClick={fu2}>like</button><br/>
    { (showdelete === true) ? 
    (<div></div>):(<button className="deletebutton" onClick={fu3}>Delete</button>)
    }
    */