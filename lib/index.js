/** Main entry point for R5 visualizer */

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import store from './store'
import Visualizer from './visualizer'
import { getNetwork } from './actions'

import './styles.css'

render(
  <Provider store={store}>
    <Visualizer />
  </Provider>,
  document.getElementById('root')
)

// get the network
store.dispatch(getNetwork(store.getState().request.scenario))