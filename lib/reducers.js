/** reducers for r5 visualizer */

import {handleActions} from 'redux-actions'

export default handleActions({
  'update search state' (state, action) {
    // TODO shouldn't set paused here but we can't dispatch a second action from a promise
    return Object.assign({}, state, { searchState: action.payload, paused: true })
  },
  'pause' (state, action) {
    return Object.assign({}, state, { paused: true })
  },
  'unpause' (state, action) {
    return Object.assign({}, state, { paused: false })
  },
  'get network' (state, action) {
    return Object.assign({}, state, { network: action.payload })
  },
  'update request' (state, action) {
    let request = Object.assign({}, state.request, action.payload)
    return Object.assign({}, state, { request })
  },
  'update visible layers' (state, action) {
    let layers = Object.assign({}, state.layers, action.payload)
    return Object.assign({}, state, { layers })
  }
})
