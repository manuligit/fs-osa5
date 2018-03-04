const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000*Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ',state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      const id = action.data
      //console.log(id)
      const anecdoteChange = state.find(n => n.id === id)
      //console.log(anecdoteChange)
      const changedAnecdote = { ...anecdoteChange, votes: anecdoteChange.votes+1 }
      return state.map(item => item.id !== id ? item : changedAnecdote )  
    case 'ADD':
      console.log(reducer)
      const name = action.data
      console.log(name)
      const newAnecdote = asObject(name)
      const newList = state.concat(newAnecdote)
      return newList
      
    default:
      return state
  }
}

export default reducer