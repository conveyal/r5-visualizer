/** The map visualizing the search process */

import React, { Component } from 'react'
import { Map, TileLayer, Marker, CircleMarker, GeoJson } from 'react-leaflet'

export default class SearchMap extends Component {
  render () {
    let { network, style, request } = this.props

    return <div style={style}>
      <Map center={[network.lat, network.lon]} zoom={12} style={{ height: '100%', width: '100%' }} onClick={this.onClick}>
        <TileLayer
          url='https://{s}.tiles.mapbox.com/v3/conveyal.hml987j0/{z}/{x}/{y}.png'
          attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
          />

        {request.fromLat != null ? <Marker position={[request.fromLat, request.fromLon]} /> : <span />}

        {this.props.layers.patterns ? this.renderLines() : []}

        {this.renderStops()}
      </Map>
    </div>
  }

  renderLines () {
    let { network, searchState } = this.props

    if (searchState != null) {
      let patternsUsedToReachAnyStopThisRound = new Set()
      // not including those used this round
      let patternsUsedToReachAnyStopThisMinute = new Set()

      for (let stopIdx = 0; stopIdx < network.stops.length; stopIdx++) {
        if (searchState.stopsTouchedThisRound[stopIdx]) {
          patternsUsedToReachAnyStopThisRound.add(searchState.raptorState.previousPatterns[stopIdx])
        } else if (searchState.allStopsTouchedThisMinute[stopIdx]) {
          patternsUsedToReachAnyStopThisMinute.add(searchState.raptorState.previousPatterns[stopIdx])
        }
      }

      let thisRound = [...patternsUsedToReachAnyStopThisRound].map(pidx => {
        let data = {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            geometry: network.patterns[pidx],
            properties: {}
          }]
        }

        return <GeoJson data={data} color={'#f88'} weight={0.5} />
      })

      let thisMinute = [...patternsUsedToReachAnyStopThisMinute].map(pidx => {
        let data = {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            geometry: network.patterns[pidx],
            properties: {}
          }]
        }

        return <GeoJson data={data} color={'#99f'} weight={0.25} />
      })

      // NB not currently showing all patterns explored this minute, clutters map too much
      return thisRound
    }
  }

  renderStops () {
    let { network, searchState } = this.props

    if (searchState != null && searchState.raptorState != null) {
      let out = []
      for (let i = 0; i < network.stops.length; i++) {
        let time = searchState.raptorState.bestNonTransferTimes[i]
        if (time < 0 || time > 15 * 60 * 60) continue

        let s = network.stops[i]

        // figure out color
        let color = '#999'

        if (searchState.stopsTouchedThisRound[i]) color = '#f33'
        else if (searchState.allStopsTouchedThisMinute[i]) color = '#55d'

        out.push(<CircleMarker center={[s[1], s[0]]} radius={1.5} color={color} key={`stop-${i}`} />)
      }

      return out
    }
  }

  onClick = (e) => {
    this.props.updateRequest({ fromLon: e.latlng.lng, fromLat: e.latlng.lat })
  }
}
