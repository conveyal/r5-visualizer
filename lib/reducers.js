/** reducers for r5 visualizer */

import {handleActions} from 'redux-actions'

export default handleActions({
  'update search state' (state, action) {
    return Object.assign({}, state, { searchState: action.payload })
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
  'set origin' (state, action) {
    let request = Object.assign({}, state.request, { fromLat: action.payload[1], fromLon: action.payload[1] })
    return Object.assign({}, state, { request })
  }
})
