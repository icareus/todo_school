import 'whatwg-fetch'

export const IDLE = 'IDLE'
export const BUSY = 'BUSY'
export const LISTS = 'LISTS'
export const TASKS = 'TASKS'

const API_URL = 'http://localhost:3000/todo/';

const doFetch = (endpoint, options) => (
  fetch(API_URL + endpoint, options))

export const working = (what) => ({
  type: BUSY,
  what,
})

export const apiCall = (options) => (endpoint) => (onResult) => {
  doFetch(endpoint, options)
    .then(
      response => response.json(),
      err => { console.warn(err) })
    .then(json => onResult(json))
    .catch(e => console.warn(e, onResult, options.method))
}
