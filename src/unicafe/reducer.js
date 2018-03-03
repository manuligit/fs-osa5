const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
  average: 0,
  positive: 0
}

const counterReducer = (state = initialState, action) => {
  let calculateAverage = () => {
    if ((state.good - state.bad) / (state.good + state.bad + state.ok))  {
      return ((state.good - state.bad) / (state.good + state.bad + state.ok)) 
    } else {
      //show 0 instead of NaN
      return 0
    } 
  }

  let calculatePositive = () => {
    if ( (state.good / (state.good + state.bad + state.ok))) {
      return (state.good / (state.good + state.bad + state.ok)) 
    } else {
      //show 0 instead of NaN
      return 0
    }
  }

  console.log(action)
  switch (action.type) {
    case 'GOOD':
      let goodCounter = { ...state, good: state.good + 1, average: calculateAverage(), 
                          positive: calculatePositive() }
      return goodCounter
    case 'OK':
      let okCounter = { ...state, ok: state.ok + 1,
                        average: calculateAverage(), positive: calculatePositive()  }
      return okCounter
    case 'BAD':
      let badCounter = { ...state, bad: state.bad + 1,
                         average: calculateAverage(), positive: calculatePositive()  }
      return badCounter
    case 'ZERO':
      let zeroedCounter = { ...state, good: 0, ok: 0, bad: 0, average: 0, positive: 0 }
      return zeroedCounter
    case 'AVERAGE':
      return ((state.good - state.bad) / (state.good + state.bad + state.ok))
    case 'POSITIVE':
      return (state.good / (state.good + state.bad + state.ok))
  }
  return state
}

export default counterReducer