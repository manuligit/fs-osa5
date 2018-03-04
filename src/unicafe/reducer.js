const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
  average: 0,
  positive: 0
}

const counterReducer = (state = initialState, action) => {
  let calculateAverage = (good, bad, ok) => {
    if ((good - bad) / (good + bad + ok))  {
      return ((good - bad) / (good + bad + ok)) 
    } else {
      //show 0 instead of NaN
      return 0
    } 
  }

  let calculatePositive = (good, bad, ok) => {
    if ( (good / (good + bad + ok))) {
      return (good / (good + bad + ok)) 
    } else {
      //show 0 instead of NaN
      return 0
    }
  }

  console.log(action)
  switch (action.type) {
    case 'GOOD':
      let goodCounter = { ...state, good: state.good + 1, 
                          average: calculateAverage(state.good+1, state.bad, state.ok), 
                          positive: calculatePositive(state.good+1, state.bad, state.ok) }
      return goodCounter
    case 'OK':
      let okCounter = { ...state, ok: state.ok + 1,
                        average: calculateAverage(state.good, state.bad, state.ok+1), 
                        positive: calculatePositive(state.good, state.bad, state.ok+1)  }
      return okCounter
    case 'BAD':
      let badCounter = { ...state, bad: state.bad + 1,
                         average: calculateAverage(state.good, state.bad+1, state.ok), 
                         positive: calculatePositive(state.good, state.bad+1, state.ok)  }
      return badCounter
    case 'ZERO':
      let zeroedCounter = { ...state, good: 0, ok: 0, bad: 0, average: 0, positive: 0 }
      return zeroedCounter
    default:
      return initialState
  }
  return state
}

export default counterReducer