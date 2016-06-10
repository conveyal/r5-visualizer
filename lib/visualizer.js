/** Set up the redux store */

import * as actionCreators from './actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import React, { Component } from 'react'
import Dock from 'react-dock'

import SearchMap from './search-map'
import Panel from './panel'

function mapStateToProps (state) {
  return state
}

// shouldn't this be a function? copied from scenario editor.
const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(Object.assign({}, actionCreators, { makeRequest: () => actionCreators.makeRequest(ownProps.request) }), dispatch)

class Visualizer extends Component {
  render () {
    let { network, searchState, request } = this.props
    if (network == null) return <div>Loading . . .</div>

    return <div style={{ height: '100%', width: '100%' }}>
      <SearchMap network={network} searchState={searchState} request={request} style={{ height: '100%', width: '70%' }} />
      <Dock position='right' isVisible dimMode='none' size={0.3}>
        <Panel network={network} searchState={searchState} request={request} />
      </Dock>
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Visualizer)
