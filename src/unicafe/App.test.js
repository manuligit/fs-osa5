import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
    average: 0,
    positive: 0
  }

  it('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      ...newState,
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  it('neutral is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      ...newState,
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  it('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      ...newState,
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  it('zero restarts all items', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      ...newState,
      good: 0,
      ok: 0,
      bad: 1
    })

    const secondAction = {
      type: 'ZERO'
    }

    deepFreeze(newState)
    const zeroState = counterReducer(newState, secondAction)
    expect(zeroState).toEqual({ ...zeroState,
      good: 0,
      ok: 0,
      bad: 0,
    })
  })

  it.skip('calculates correct average', () => {
    const state = initialState
    const goodState = counterReducer(state, { type: 'GOOD' })
    expect(goodState).toEqual({ 
      ...goodState,
      good: 1,
      ok: 0,
      bad: 0
    })
    // const firstAverage = counterReducer(goodState, { type: 'AVERAGE' })
    // expect(firstAverage).toEqual(1)
    // deepFreeze(firstAverage)
    // const okayState = counterReducer(goodState, { type: 'OK' })
    // expect(okayState).toEqual({
    //   ...okayState,
    //   good: 1,
    //   ok: 1,
    //   bad: 0
    // })
    //const secondAverage = counterReducer(okayState, { type: 'AVERAGE' })
    //expect(secondAverage).toEqual(0.5)

    //const badState = counterReducer(okayState, { type: 'BAD' })
    //const thirdAverage = counterReducer(badState, { type: 'AVERAGE' })
    //expect(thirdAverage).toEqual(0)
  })


  it.skip('calculates correct percentage of positive', () => {
    const state = initialState

    deepFreeze(state)
    const goodState = counterReducer(state, { type: 'GOOD' })
    expect(goodState).toEqual({
      ...goodState,
      good: 1,
      ok: 0,
      bad: 0
    })

    const okayState = counterReducer(goodState, { type: 'OK' })
    expect(okayState).toEqual({
      ...okayState,
      good: 1,
      ok: 1,
      bad: 0
    })

    const badState = counterReducer(okayState, { type: 'BAD' })
    expect(badState).toEqual({
      ...badState,
      good: 1,
      ok: 1,
      bad: 1
    })

    deepFreeze(state)
    //const sumState = counterReducer(badState, { type: 'POSITIVE' })
    //expect(sumState).toEqual(0.3333333333333333)
  })
})