import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
  let blogComponent
  //<Blog blog={blog} like={this.addLike} delete={this.deleteBlog} currentUser={this.state.user}/>
  beforeEach(() => {
    const blog = {
      id: 1,
      title: 'titteli',
      author: 'kirjoittaja',
      url: 'http://www.fi',
      likes: 3,
      user: {username: 'joku', name: 'Joku Joukahainen'}
    }

    blogComponent = shallow ( <Blog blog={blog} /> )

    
  })

})