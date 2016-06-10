/** Set up the redux store */

import * as actionCreators from './actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import React, { Component } from 'react'
import Dock from 'react-dock'

import SearchMap from './search-map'
import Panel from './panel'
import store from './store'

function mapStateToProps (state) {
  return state
}

// shouldn't this be a function? copied from scenario editor.
// TODO store.getState().request is a clooge but ownProps is not working
const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(Object.assign({}, actionCreators, { makeRequest: () => actionCreators.makeRequest(store.getState().request) }), dispatch)

class Visualizer extends Component {
  render () {
    let { network, searchState, request, updateRequest, layers } = this.props
    if (network == null) return <div>Loading . . .</div>

    return <div style={{ height: '100%', width: '100%' }}>
      <SearchMap network={network} searchState={searchState} request={request} style={{ height: '100%', width: '70%' }} updateRequest={updateRequest} layers={layers} />
      <Dock position='right' isVisible dimMode='none' size={0.3}>
        <Panel network={network} searchState={searchState} request={request}
          {...this.props}
         />
      </Dock>
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Visualizer)
