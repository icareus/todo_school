/**
 * Created by Antoine on 19/07/2016.
 */
// import _ from 'lodash'
import { ADD_LIST, DEL_LIST, GOT_LISTS } from '../actions/lists'
import { ADD_TASK, INPUT_TASK } from '../actions/tasks'
import { append, reject, map, assoc } from 'ramda'

export default function lists(state = [], action) {
  switch (action.type) {
  case ADD_LIST:
    return append(action.list, state);

  case DEL_LIST:
    return reject(list => list.id === action.id, state)
    // return _.reject(state, list => (
    //  list.id === parseInt(action.id)));

  // !!! UNTESTED - server needs upgrade
  case ADD_TASK:
    return map(list =>
        list.id === action.id
        ? list
        : assoc('input', '', list),
      state)
    // return _.map(state, list => (
    //   list.id === parseInt(action.id) ?
    //     list : _.create(list, { input: '' })))

  case INPUT_TASK:
    return map(list =>
      list.id === parseInt(action.id)
      ? assoc('input', action.input, list)
      : list,
    state)
    // return _.map(state, list => (
    //   (list.id === parseInt(action.id)) ?
    //     _.create(list, { input: action.input }) : list))

  case GOT_LISTS:
    return map(l => ({
      ...l,
      id: parseInt(l.id),
      key: parseInt(l.id),
      input: '' }),
    action.lists)

  default:
    return state;
  }
}
