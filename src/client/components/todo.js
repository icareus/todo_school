/**
 * Created by Antoine on 11/07/2016.
 */
import React from 'react'
import { map, filter } from 'ramda'
import TaskList from './tasklist'

const Todo = ({ lists, tasks, handlers }) => (
  <div className='todo'>
  {map(taskList => (
    <TaskList
      handlers={ handlers }
      key={ taskList.id }
      list={ taskList }
      tasks={
        filter(t => (t.listId === taskList.id)),
        tasks } />),
  lists)}
  </div>
)

Todo.propTypes = {
  handlers: React.PropTypes.object.isRequired,
  lists: React.PropTypes.array.isRequired,
  tasks: React.PropTypes.array.isRequired,
}

export default Todo
