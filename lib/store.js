/** Set up the redux store */

import {applyMiddleware, compose, createStore} from 'redux'

import multi from './multi'
import promise from './promise'
import rootReducer from './reducers'
import createLogger from 'redux-logger'

let middleware = [multi, promise]
if (process.env.NODE_ENV === 'development') middleware.push(createLogger({ collapsed: true, duration: true }))

export default createStore(
  rootReducer,
  {
    searchState: null,
    request: {
      date: '2016-06-06',
      fromTime: 25200,
      toTime: 32400,
      accessModes: 'WALK',
      egressModes: 'WALK',
      transitModes: 'WALK,TRANSIT',
      walkSpeed: 1.3888888888888888,
      bikeSpeed: 4.166666666666667,
      carSpeed: 20,
      streetTime: 90,
      maxWalkTime: 20,
      maxBikeTime: 20,
      maxCarTime: 45,
      minBikeTime: 10,
      minCarTime: 10,
      suboptimalMinutes: 5,
      reachabilityThreshold: 0,
      analyst: true,
      bikeSafe: 1,
      bikeSlope: 1,
      bikeTime: 1,
      boardingAssumption: 'RANDOM',
      scenario: {
        modifications: []
      }
    }
  },
  compose(applyMiddleware(...middleware))
)
