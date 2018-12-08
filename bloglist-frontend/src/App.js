import React from 'react'
import Blog from './components/Blog'
import User from './components/User'

import blogService from './services/blogs'
import userService from './services/users'
import Notification from './components/Notification'
//import noteService from './services/notes'
import loginService from './services/login'
import './index.css'
import Togglable from './components/Togglable'
import TogglableDiv from './components/TogglableDiv'

import LoginForm from './components/LoginForm'
const jwt = require('jsonwebtoken')


const getTokenOwner = (tokeni) => {

    let secru = "aksdjuioouimzxcvsdfd"

    try {
        const decodedToken = jwt.verify(tokeni, secru)
        console.log('Blogin lisaaja: ', decodedToken.id)
        return decodedToken.id

    } catch (exception) {
        console.log('Could not get user.id from token')
        return null
    }

}

const sortBlogs = (blogs) => {

    let allBlogs = blogs
    allBlogs.sort((a, b) => b.likes - a.likes)

    console.log('Sorted blogs:', allBlogs)

    return allBlogs
}

//DeletableBlog(this.state.blogs,this.state.currentuserid)

const deletableBlog = (ablog, me) => {

    console.log('Blogi:', ablog)
    console.log('Currentuser:', getTokenOwner(me))

    let res = false

    try {  //tyypin mukainen iffittely?
        if (ablog.user._id === me || ablog.user === undefined || ablog.user === me) {
            console.log('Blogiowner === this', me)
            res = true
        }
    }
    catch (exception) {  // typically if user is not definedx
        console.log('No luck?', ablog, ' vs. ', me)
        return true
    }

    return res

}



const Blogy = ({ blog, fu1 }) => {
    return
    (
        <div className="blogbody">
            <a target="_new" href="`blog.url`">{blog.url}</a>
            <form onSubmit={fu1}>
                {blog.likes} likes <button>like</button><br />
            </form>
            added by !!!{blog.user} .!!!
  </div>
    )
}

const showBlogsitXXX = ({ allblogs, blog, fu1, visibleOne }) => {

    return (
        <div>
            <h2>Blogs</h2>
            {allblogs.map(blog =>
                <div key={blog._id} id={blog._id} >
                    <Blog key={blog._id} id={blog._id} blog={blog} />
                </div>
            )
            }
        </div>
    )
}

// const User = (username, name, blogsqty) => (
//     <div>
//         <div>&nbsp;&nbsp;&nbsp;&nbsp;"Blogs added"</div>
//         <div key={username}>
//             <div><a href="#">{name}</a> 0 </div>
//         </div>
//     </div>
// )







class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            blogs: [],
            error: '',  // also info msgs use this 
            user: null,
            currentuser: null,
            currentuserid: null,
            title: '',
            author: '',
            url: '',
            blogvisible: false,
            blogvisibleid: '',
            lastopened: null,
            clicksdone: 0,
            todoLikeUpdate: '',
            likecounter: 0,
            allusers: [],
            users: []
        }
    }

    addBlog = async (event) => {
        event.preventDefault()
        let tokeni = this.state.user.token

        let secru = "aksdjuioouimzxcvsdfd"

        try {

            //console.log('proces.secr', secru)
            const decodedToken = jwt.verify(tokeni, secru)

            console.log('Blogin lisaaja: ', decodedToken.id)
            let bname = this.state.title

            // todo - should this actually store the user as object ...
            //let miUser = userService.find({_id: decodedToken.id})
            //console.log('dui!',miUser)

            const miBlog = {
                title: this.state.title === null ? null : this.state.title,
                author: this.state.author,
                url: this.state.url,
                userid: decodedToken.id
            }

            const createdBlog = await blogService.create(miBlog)

            console.log('Luotiin?', createdBlog)
            //console.log('user data: ', allusers)
            let existingBlogs = this.state.blogs.concat(createdBlog)
            let exUsers = this.state.allusers.concat(createdBlog.author)
            this.setState({
                title: '', author: '', url: ''
                , blogs: existingBlogs,
                error: `Blog '${bname}' added.`,
                msgtype: 'info',
                allusers: exUsers
            })
            setTimeout(() => {
                this.setState({ error: null, msgtype: null })
            }, 5000)

        }
        catch (exception) {
            this.setState({
                error: 'New blog could not be added',
                msgtype: 'error'
            })
            setTimeout(() => {
                this.setState({ error: null, msgtype: null })
            }, 5000)
            console.log('No blog added:', exception)
        }
    }

    login = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username: this.state.username,
                password: this.state.password
            })

            window.localStorage.setItem('loggedappUser', JSON.stringify(user))

            blogService.setToken(user.token)

            let secru = "aksdjuioouimzxcvsdfd"
            let tokeni = user.token

            const decodedToken = jwt.verify(tokeni, secru)
            //console.log('Blogin lisaaja: ', decodedToken.id)
            user._id = decodedToken.id


            console.log('Useri:', user, '---', user.token)

            this.setState({ currentuserid: decodedToken.id })
            this.setState({ currentuser: user.name })
            this.setState({ username: '', password: '', user: user })
        } catch (exception) {
            this.setState({
                msgtype: 'error',
                error: 'Username or password erroneous'
            })
            setTimeout(() => {
                this.setState({ error: null })
            }, 5000)
        }
    }

    handleLoginFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleBlogFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    toggleVisible = () => {
        this.setState({ showAll: !this.state.showAll })
    }

    handleDeleteClick = async (idx) => {

        let temp = idx.id
        console.log('Deletys:', temp, " blogi:", idx)
        let res
        try {
            res = blogService.deletex(temp)
            console.log('Resultti?', res.response.status)

            if (res.response.status !== '200') { } else {
                let allBlogs = this.state.blogs
                console.log('All blogs nyte:', allBlogs, ' dellattava: ', temp)
                delete allBlogs[temp]
                this.setState({ blogs: allBlogs })
            }
        } catch (exception) {
            this.setState({
                msgtype: 'error',
                error: 'Could not delete' + temp
            })
            setTimeout(() => {
                this.setState({ error: null })
            }, 5000)
        }
    }



    handleLikeClick = async (idx) => {

        let temp = idx.id
        console.log('Liketys:', temp, " blogi:", idx)
        let curBlog = idx //this.state.blogs.filter({"id": temp})
        console.log('Curblog', curBlog)



        try {
            let curLikes = curBlog.likes + 1
            let updBlog = curBlog
            updBlog.likes = curLikes
            console.log('Upd blogi: ', updBlog)

            blogService.update(temp, updBlog)
            let allBlogs = this.state.blogs
            delete allBlogs[temp]
            allBlogs.concat(updBlog)

            this.setState({ blogs: allBlogs })

        } catch (exception) {
            this.setState({
                msgtype: 'error',
                error: 'Could not store update' + temp + exception
            })
            setTimeout(() => {
                this.setState({ error: null })
            }, 5000)
        }
    }


    handleClick = (idx) => {
        //https://stackoverflow.com/a/47130799/364931
        //console.log("AAA",text,' id ',idx, ' eventti : ', event);
        //console.log('AAA', idx.id)

        let temp = idx.id
        let kliksui = this.state.clicksdone + 1

        this.setState({
            blogvisibleid: idx.id,
            clicksdone: kliksui,
            lastopened: temp
        })
    }


    async componentDidMount() {

        //    blogService.getAll().then(blogs =>
        //      this.setState({ blogs })
        //    )
        let kama = await blogService.getAll()
        //this.setState({ blogs: kama })

        // const allBlogs = await blogService.getAll()
        //this.setState({allBlogs})
        const users = await userService.getAll()
        //console.log('MountissaXXX', users)

        this.setState({
            blogs: kama,
            users: users
        })

        const loggedUserJSON = window.localStorage.getItem('loggedappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            console.log('Userixxx', user)
            this.setState({ user: user })   // user?
            blogService.setToken(user.token)
        }
    }

    logout = async (event) => {
        window.localStorage.clear() // kaek pois!
    }

    render() {


        const showBlogs = (blogsit) => (
            <div>
                <h2>Blogs</h2>
                {blogsit.map(blog =>
                    <div key={blog._id}>
                        <Blog key={blog._id} id={blog._id} blog={blog}
                            adder='tbs'
                            newlikes={this.state.likecounter}
                            likedOne={this.state.likedOne}
                            fu1={() => this.handleClick(blog)}
                            fu2={() => this.handleLikeClick(blog)}
                            visible={this.state.blogvisibleid}
                            lastopened={this.state.lastopened}
                            counter={this.state.clicksdone}
                            showdelete={deletableBlog(blog, this.state.user.token)}
                            fu3={() => this.handleDeleteClick(blog)}
                            currentuser={this.state.currentuserid}
                        />
                    </div>
                )}
            </div>
        )


        const showUsers = (allusers) => {
            <div>
                <h2>Users</h2>
                {allusers.map(user =>
                    <div key={user.username}>user.name</div>
                )}
            </div>
        }


        const showUsersForm = () => (
            <div>
                <h2>Users1</h2>
                {this.state.users.map(user =>
                    <div key={user.username}>{user.name}</div>
                )}
            </div>
        )



        const addBlogForm = () => (
            <div>
                <h2>Create new</h2>
                <form onSubmit={this.addBlog}>
                    <div>
                        title
                        <input
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleBlogFieldChange}
                        /><br />
                        author
                        <input
                            type="text"
                            name="author"
                            value={this.state.author}
                            onChange={this.handleBlogFieldChange}
                        /><br />
                        url
                        <input
                            type="text"
                            name="url"
                            value={this.state.url}
                            onChange={this.handleBlogFieldChange}
                        /><br />
                    </div>
                    <button>Create</button>
                </form>
            </div>
        )

        const loginForm = () => (
            <Togglable buttonLabel="login">
                <LoginForm
                    visible={this.state.visible}
                    username={this.state.username}
                    password={this.state.password}
                    handleChange={this.handleLoginFieldChange}
                    handleSubmit={this.login}
                />
            </Togglable>
        )

        console.log("Kaek, tyypit", this.state.users)
        //showUsers(this.state.users)

        //                #allusers = "
        return (
            <div>
                <Notification message={this.state.error} msgtype={this.state.msgtype} />

                <h2>Welcome to blog app</h2>
                {this.state.user === null ?
                    loginForm() :
                    <div>
                        <p>{this.state.user.name} logged in &nbsp;</p>
                        <form onSubmit={this.logout}><button>logout</button></form>
                        {addBlogForm()}

                        {showUsersForm(this.state.users)}

                        {showBlogs(sortBlogs(this.state.blogs))}

                    </div>
                }

            </div>
        );
    }
}

export default App;
