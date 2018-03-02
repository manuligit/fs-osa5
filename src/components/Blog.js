import React from 'react'
class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null
    }
  }

  toggleSelected = () => {
    console.log("click")
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

    if (this.state.selected) {
      return (
        <div style={blogStyle}>
          <div onClick={this.toggleSelected}>
            {this.props.blog.title} by {this.props.blog.author} </div>
            <a href={this.props.blog.url}>{this.props.blog.url}</a><br/>
          {this.props.blog.likes} likes 
          <button type="submit">like</button> <br/>
          Added by {this.props.blog.user.name}
      </div>
      )
    }

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