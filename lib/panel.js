/** The side panel */

import React, { Component } from 'react'

function toHhMm (secs) {
  return `${Math.round(secs / 3600)}:${(secs % 3600 < 600 ? '0' : '') + Math.round(secs % 3600) / 60}`
}

export default class Panel extends Component {
  setDate = (e) => {
    this.props.updateRequest({ date: e.target.value })
  }

  render () {
    let grayOutContinueButtons = this.props.searchState == null || !this.props.paused || this.props.searchState.complete
    let grayOutNewSearchButton = this.props.request.fromLat == null
    return <div>
      <button onClick={this.props.makeRequest} disabled={grayOutNewSearchButton}>Start new search</button><br />
      <button onClick={this.props.continueToNextRound} disabled={grayOutContinueButtons}>Continue to next round</button><br />
      <button onClick={this.props.continueToNextSearch} disabled={grayOutContinueButtons}>Continue to next search</button><br />
      <button onClick={this.props.continueToNextMinute} disabled={grayOutContinueButtons}>Continue to next minute</button><br />

      <label>Date: <input type='text' value={this.props.request.date} onChange={this.setDate} /></label>

      <label>
        Show pattern layer
        <input type='checkbox' checked={this.props.layers.patterns} onChange={(e) => this.props.updateVisibleLayers({ patterns: e.target.checked })} />
      </label>

      {this.renderResults()}
    </div>
  }

  renderResults () {
    let { searchState } = this.props

    if (searchState != null) {
      return <table>
        <tr><th>Round</th><td>{searchState.round}</td></tr>
        <tr><th>Compute time</th><td>{searchState.cumulativeMs}ms</td></tr>
        <tr><th>Iteration</th><td>{searchState.iteration}</td></tr>
        <tr><th>Departure minute</th><td>{toHhMm(searchState.departureTime)}</td></tr>
        <tr><th>Stops touched round</th><td>{searchState.stopsTouchedThisRound.filter(a => a).length}</td></tr>
        <tr><th>Stops touched in scheduled search</th><td>{searchState.stopsTouchedThisMinuteScheduled.filter(a => a).length}</td></tr>
        <tr><th>Stops touched this minute</th><td>{searchState.allStopsTouchedThisMinute.filter(a => a).length}</td></tr>

        {(() => {
          if (searchState.raptorState != null) {
            return <tr><th>Stops reached</th><td>{searchState.raptorState.bestNonTransferTimes.filter(t => t < 15 * 60 * 60 && t > 0).length}</td></tr>
          } else return []
        })()}
      </table>
    }
  }
}
