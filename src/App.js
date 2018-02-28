import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null
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

  handleLoginFieldChange = (event) => {
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
    } catch(exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout() {
    //console.log("logout")
    window.localStorage.clear()
  }


  render() {
    const loginForm = () => (
      <div>
        <h2>Login to application</h2>
        <form onSubmit={this.login}>
          <div> Username
            <input 
              type="text" 
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div> Password
            <input 
              type="text"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
              />
          </div>
          <button type="submit">Kirjaudu</button>
        </form>
      </div>
    )

    const blogList = () => (
      <div>
        <h2>blogs</h2>
        {this.state.user.username} logged in
        <button type="button" onClick={this.logout}>logout</button>
        
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    )

    return (
      <div>
        {this.state.user === null && loginForm()}

        {this.state.user !== null && blogList()}
      </div>
    );
  }
}

export default App;