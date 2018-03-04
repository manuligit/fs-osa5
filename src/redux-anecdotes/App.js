import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      textValue: ''
    }
  }

  vote = (event) => {
    event.preventDefault()
    //console.log("voting")
    let id = event.target.value
    this.props.store.dispatch({ type: 'VOTE', data: id })
  }

  addAnecdote = (event) => {
    event.preventDefault()
    //console.log("creating new anecdote")
    let name = this.state.textValue
    if (name) {
      this.props.store.dispatch({ type: 'ADD', data: this.state.textValue })
    } else {
      console.log("not")
    }
  }

  handleFormChange = (event) => {
    event.preventDefault()
    this.setState({ textValue: event.target.value })
  }

  render() {
    const anecdotes = this.props.store.getState()
    anecdotes.sort(function (a, b) {
      return a.votes < b.votes
    })

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote} value={anecdote.id}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input type="text" name="value" onChange={this.handleFormChange} /></div>
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}

export default App