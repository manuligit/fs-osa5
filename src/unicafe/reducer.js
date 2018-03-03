const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      let goodCounter = { ...state, good: state.good + 1 }
      return goodCounter
    case 'OK':
      let okCounter = { ...state, ok: state.ok + 1 }
      return okCounter
    case 'BAD':
    let badCounter = { ...state, bad: state.bad + 1 }
    return badCounter
    case 'ZERO':
    let zeroedCounter = { ...state, good: 0, ok: 0, bad: 0 }
    return zeroedCounter
  }
  return state
}

export default counterReducer