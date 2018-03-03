import React from 'react'
class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null
    }
  }

  toggleSelected = () => {
    //console.log(this.props.blog.id)
    this.setState({selected: !this.state.selected})
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    //if no user, anyone can delete
    if (!this.props.blog.user) {
      if (this.state.selected) {
        return (
          <div style={blogStyle}>
            <div onClick={this.toggleSelected}>
              {this.props.blog.title} by {this.props.blog.author} </div>
              <a href={this.props.blog.url}>{this.props.blog.url}</a><br/>
            {this.props.blog.likes} likes 
            <button onClick={this.props.like} value={this.props.blog.id}>like</button><br/>
            Added by unknown <button onClick={this.props.delete} value={this.props.blog.id}>delete</button><br/>
        </div>
        )
      }
    } else {
      if (this.state.selected) {
        //if the user is same as blogs adder, show the delete button:
        //use usernames because they are unique
        if (this.props.blog.user.username === this.props.currentUser.username) {
          //console.log(this.props.currentUser.token)
          return (
            <div style={blogStyle}>
              <div onClick={this.toggleSelected}>
                {this.props.blog.title} by {this.props.blog.author} 
              </div>
              <a href={this.props.blog.url}>{this.props.blog.url}</a><br/>
              {this.props.blog.likes} likes 
              <button onClick={this.props.like} value={this.props.blog.id}>like</button><br/>
              Added by {this.props.blog.user.name} <button onClick={this.props.delete} value={this.props.blog.id}>delete</button><br/>
            </div>
          )
        }

        return (
          <div style={blogStyle}>
            <div onClick={this.toggleSelected}>
              {this.props.blog.title} by {this.props.blog.author} 
            </div>
            <a href={this.props.blog.url}>{this.props.blog.url}</a><br/>
            {this.props.blog.likes} likes 
            <button onClick={this.props.like} value={this.props.blog.id}>like</button><br/>
            Added by {this.props.blog.user.name}
          </div>
        )
    }}

    return (
      <div style={blogStyle}>
        <div onClick={this.toggleSelected}>
          {this.props.blog.title} by {this.props.blog.author}
        </div>  
      </div>
    )
  }
}

export default Blog