import { createSelector } from 'reselect'
import { prop } from 'ramda'

const getApiStatus = prop('api')
const getLists = prop('lists')
const getTasks = prop('tasks')

const storeSelector = createSelector(
  getApiStatus, getLists, getTasks,
  (api, lists, tasks) => ({ api, lists, tasks })
)

export default storeSelector
