/**
 * Created by Antoine on 19/07/2016.
 */
import { apiCall, working, LISTS } from './api'

export const ADD_LIST = 'ADD_LIST';
export const DEL_LIST = 'DEL_LIST';
export const GOT_LISTS = 'GOT_LISTS';

export const addList = list => ({
  type: ADD_LIST,
  list: {
    ...list,
    id: parseInt(list.id),
  },
})

export const delList = id => ({
  type: DEL_LIST,
  id,
})

export const gotLists = lists => ({
  type: GOT_LISTS,
  lists,
})

export const deleteList = (id) => (dispatch) => {
  dispatch(working(LISTS));
  return (apiCall({ method: 'DELETE' })('lists/'.concat(id))(r => dispatch(delList(r.id))))
}

export const pushList = (newList) => (dispatch) => {
  const req = {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ 'todo': { 'label': newList } }),
  }
  dispatch(working(LISTS));
  return apiCall(req)('lists')(l => dispatch(addList(l)))
}

export const getLists = () => (dispatch) => {
  dispatch(working(LISTS));
  apiCall({ method: 'GET' })('lists')(lists => dispatch(gotLists(lists)));
}
