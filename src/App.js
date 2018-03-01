import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      title: '',
      author: '',
      url: '',
      message: null,
      loginVisible: false
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  } 

  handleFormFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})

      this.setState({ message: `Logged in successfully` })
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)


    } catch(exception) {
      this.setState({
        message: 'Wrong username or password',
      })
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)
    }
  }

  logout = () => {
    window.localStorage.clear()

    this.setState({ message: `Logged out successfully`, 
                    username: '',
                    password: '',
                    user: null, })
    setTimeout(() => {
      this.setState({ message: null })
    }, 5000)
  }

  createBlog = (event) => {
    event.preventDefault()
    console.log("creating a blog", this.state.title)
    let newBlog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }
    try { 
      blogService.create(newBlog)
      this.setState({ 
        author: '',
        title: '',
        url: ''
      })

      this.setState({ message: `${newBlog.title} created successfully` })
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)

    }
    catch (error) {
      console.log(error.name)
    }
    //console.log(response.data)
  }

  render() {
    const blogList = () => (
      <div>
        <h2>blogs</h2>
        {this.state.user.username} logged in
        <button type="button" onClick={this.logout}>logout</button>
        
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}

        <CreateBlogForm title={this.state.title} author={this.state.author} url={this.state.url} 
                createBlog={this.createBlog.bind(this)} 
                handleFormFieldChange={this.handleFormFieldChange.bind(this)} />
      </div>
    )

    const loginForm = () => {
      const hideWhenVisible = { display: this.state.loginVisible ? 'none' : '' }
      const showWhenVisible = { display: this.state.loginVisible ? '' : 'none' }

      return (
        <Togglable buttonLabel="Login">
            <LoginForm login={this.login} 
                       username={this.state.username}
                       handleFormFieldChange={this.handleFormFieldChange} 
                       password={this.state.password}/>
        </Togglable>
      )

    }
    return (
      <div>
        <Notification message={this.state.message} />
        {this.state.user === null && loginForm() }

        {this.state.user !== null && blogList()}
      </div>
    );
  }
}

export default App;