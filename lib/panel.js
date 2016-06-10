/** The side panel */

import React, { Component } from 'react'

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

      {this.renderResults()}
    </div>
  }

  renderResults () {
    let { searchState } = this.props

    if (searchState != null) {
      return <div>
        Round {searchState.round}, compute time {searchState.cumulativeMs}ms.
      </div>
    }
  }
}
