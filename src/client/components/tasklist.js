/**
 * Created by Antoine on 11/07/2016.
 */
import React from 'react'
import _ from 'lodash'
import ListHead from './listhead'
import Task from './task'
import NewTask from './newtask'

const TaskList = ({ handlers, list, tasks }) => (
  <div className='todo-list'>
    <ListHead
      id={list.id}
      onDelList={handlers.onDelList}
      title={list.title} />
    <div className='flex-container'>
    <NewTask
      handleChange={ handlers.taskChange }
      input={list.input}
      listID={list.id}
      onNewTask={handlers.onNewTask} />
    {_.map(tasks, (task =>
      <Task key={task.id} onDelTask={handlers.onDelTask} task={task} />))}
    </div>
  </div>
)

TaskList.propTypes = {
  handlers: React.PropTypes.object.isRequired,
  list: React.PropTypes.object.isRequired,
  tasks: React.PropTypes.array.isRequired,
}

export default TaskList
