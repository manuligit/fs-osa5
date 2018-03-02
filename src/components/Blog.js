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
    if (!this.props.blog.user) { 
      return ( null )
    }
    //check for user just in case
    if (this.props.blog.user) { 
      if (this.state.selected) {
        return (
          <div style={blogStyle}>
            <div onClick={this.toggleSelected}>
              {this.props.blog.title} by {this.props.blog.author} </div>
              <a href={this.props.blog.url}>{this.props.blog.url}</a><br/>
            {this.props.blog.likes} likes 
            <button onClick={this.props.like} value={this.props.blog.id}>like</button><br/>
            Added by {this.props.blog.user.name}
        </div>
        )
      }
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