/** The map visualizing the search process */

import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'

export default class SearchMap extends Component {
  render () {
    let { network, style } = this.props

    return <div style={style}>
      <Map center={[network.lat, network.lon]} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url='https://{s}.tiles.mapbox.com/v3/conveyal.hml987j0/{z}/{x}/{y}.png'
          attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
          />
      </Map>
    </div>
  }
}
