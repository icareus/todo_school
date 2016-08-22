/**
 * Created by Antoine on 20/07/2016.
 */
import { concat, map, reject } from 'ramda'
import { ADD_TASK, DEL_TASK, GOT_TASKS } from '../actions/tasks'
import { DEL_LIST } from '../actions/lists'

export default function tasks(state = [], action) {
  switch (action.type) {
  case ADD_TASK:
    return concat(state, action.task);

  case DEL_TASK:
    return reject(task => task.id === parseInt(action.id),
      state)

  case DEL_LIST:
    return reject(task => task.listId === parseInt(action.id),
      state);

  case GOT_TASKS:
    return action.tasks

  default:
    return state;
  }
}
