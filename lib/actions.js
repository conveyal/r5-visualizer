/** Action definitions */

import {createAction} from 'redux-actions'

/** Update the internal state of the search with the return value from the server */
export const updateSearchState = createAction('update search state')

/** begin a new search */
function beginSearch (profileRequest) {
  return fetch('/api/plan', {
    method: 'post',
    body: JSON.stringify(profileRequest),
    credentials: 'include'
  })
  .then(res => res.json())
  .then(res => updateSearchState(res))
}

/** Continue a paused search */
function continueSearch (endpoint) {
  return fetch(`/api/${endpoint}`, { method: 'post', credentials: 'include' })
    .then(res => res.json())
    .then(res => updateSearchState(res))
}

/** called when user updates the request */
export const updateRequest = createAction('update request')

/** Unpause the search, locking the UI */
export const unpause = createAction('unpause')

/** Pause the search, allowing the user to continue it */
export const pause = createAction('pause')

export const continueToNextRound = () => [unpause(), continueSearch('continueToNextRound')]
export const continueToNextMinute = () => [unpause(), continueSearch('continueToNextMinute')]
export const continueToNextSearch = () => [unpause(), continueSearch('continueToNextSearch')]
export const makeRequest = (request) => [pause(), beginSearch(request)]
export const getNetwork = () => fetch('/api/network').then(res => res.json()).then(res => createAction('get network')(res))

export const updateVisibleLayers = createAction('update visible layers')
