import React from 'react';


class App extends React.Component {
  vote = (event) => {
    event.preventDefault()
    console.log("voting")
    let id = event.target.value
    //console.log(id)
    this.props.store.dispatch({ type: 'VOTE', data: id })
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
        <form>
          <div><input /></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App