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

      <label>Date: <input type='text' value={this.props.request.date} onChange={this.setDate} /></label><br/>

      <label>
        <input type='checkbox' checked={this.props.layers.patterns} onChange={(e) => this.props.updateVisibleLayers({ patterns: e.target.checked })} />
        Show pattern layer
      </label><br />

      <label>
        Scenario:
        <input type='file' onChange={this.selectScenario} />
      </label>

      ({this.props.request.scenario.modifications.length} modifications)

      {this.renderResults()}
    </div>
  }

  renderResults () {
    let { searchState } = this.props

    if (searchState != null) {
      return <table>
        <tbody>
          <tr><th>Round</th><td>{searchState.round}</td></tr>
          <tr><th>Search type</th><td>{searchState.frequencySearch ? 'Frequency' : 'Scheduled'}</td></tr>
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

        {/* NB this does not double count patterns explored more than once */}

          <tr><th>Patterns explored round</th><td>{searchState.patternsExploredThisRound.filter(a => a).length}</td></tr>
          <tr><th>Patterns explored in scheduled search</th><td>{searchState.patternsExploredThisMinuteScheduled.filter(a => a).length}</td></tr>
          <tr><th>Patterns explored in frequency search</th><td>{searchState.patternsExploredThisMinuteFrequency.filter(a => a).length}</td></tr>

        </tbody>
      </table>
    }
  }

  selectScenario = (e) => {
    // read the shapefile
    const reader = new window.FileReader()
    reader.onloadend = this.scenarioRead
    reader.readAsText(e.target.files[0])
  }

  scenarioRead = (scenario) => {
    scenario = JSON.parse(scenario.target.result)
    this.props.updateRequest({ scenario })
    this.props.getNetwork(scenario)
  }
}
