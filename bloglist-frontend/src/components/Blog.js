import React from 'react'
import '../index.css'

const tyyli = ({blog,visible,lastopened,clicksdone}) => {

  //console.log('Toggling ', blog.id)
  let res

  if ( visible === blog.id) {
    //console.log('Toggling', blog.id, ' vs ', visible)
      res = 'visible'
    } else {
      res =  'hidden'  
    }

    if (visible === blog.id === lastopened) {
      res = 'hidden'
    }

  return res
}


const Blog = ({blog, adder, fu1, fu2, classStyle, visible, lastopened,clicksdone,
  likedOne, likedcounter, fu3, currentuserid, showdelete}) => (

    <div key={blog._id}>
    <div className="blogheader" onClick={fu1}>{blog.title} {blog.author}</div>
    <div key={blog._id} id="{blog._id}" name="blogcontent" classnxame="{classStyle}"
    className={tyyli({blog,visible, lastopened,clicksdone})} >
<a target="_new" href="`blog.url`">{blog.url}</a>
&nbsp;&nbsp;{blog.likes} likes <button className="likebutton" onClick={fu2}>like</button><br/>
  { (showdelete === true) ? 
  (<div></div>):(<button className="deletebutton" onClick={fu3}>Delete</button>)
  }
</div>
   </div>
)

export default Blog

//added by {(blog.user !== null || blog.user!==undefined) ? blog.user.name : '-'   }
//<form onSubmit={fu2}> ... </form>

//
//{ (blog.user.id === currentuserid) ? ( <button onClick={fu3}>Delete</button> ) : (<div></div> &&)}
