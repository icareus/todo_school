/**
 * Created by Antoine on 19/07/2016.
 */
// import _ from 'lodash'
import { ADD_LIST, DEL_LIST, GOT_LISTS } from '../actions/lists'
import { ADD_TASK, INPUT_TASK } from '../actions/tasks'
import { append, assoc, evolve, map, memoize, pipe, reject } from 'ramda'

const toInt = memoize(x => parseInt(x, 10)) // memoizing because I can

export default function lists(state = [], action) {
  switch (action.type) {
  case ADD_LIST:
    return append(action.list, state);

  case DEL_LIST:
    return reject(list => list.id === action.id, state)
    // -> native es6 features look prettier than Ramda here
    // return reject(compose(equals(action.id), prop('id')), state)

  // !!! UNTESTED - server doesn't handle tasks yet
  case ADD_TASK:
    return map(list =>
        list.id === action.id
        ? list
        : assoc('input', '', list),
      state)
    // old version :
    // return _.map(state, list => (
    //   list.id === parseInt(action.id) ?
    //     list : _.create(list, { input: '' })))

  case INPUT_TASK:
    return map(list =>
      list.id === toInt(action.id)
      ? assoc('input', action.input, list)
      : list,
    state)
    // return _.map(state, list => (
    //   (list.id === parseInt(action.id)) ?
    //     _.create(list, { input: action.input }) : list))

  case GOT_LISTS:
    const processList = pipe(
      evolve({ id: toInt }), // ain't that poetry ?
      assoc('input', ''))
    return map(processList, action.lists)
    // Ramda saves me 2 lines, and increases readability
    // return map(l => ({
    //   ...l,
    //   id: parseInt(l.id),
    //   key: parseInt(l.id),
    //   input: '' }),
    // action.lists)

  default:
    return state;
  }
}
