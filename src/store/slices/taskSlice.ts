import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import { ITask, TaskListType } from '../../types'
import { TASK_LIST_DICTIONARY } from '../../contants'

interface IState {
  completedTaskList: ITask[]
  todoTaskList: ITask[]
  allTasks: ITask[]
}

const initialState: IState = {
  completedTaskList: [],
  todoTaskList: [],
  allTasks: [],
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    updateTask: (state, action: PayloadAction<ITask>) => {
      const taskList = state[TASK_LIST_DICTIONARY[action.payload.taskList]]

      const index = taskList.findIndex(task => task.id === action.payload.id)
      if (index !== -1) {
        taskList[index] = action.payload
      }
    },
    addTask: (state, action: PayloadAction<Pick<ITask, 'title'>>) => {
      const newTask: ITask = {
        id: uuidv4(),
        completed: false,
        bgColor: 'gray',
        taskList: 'all',
        ...action.payload,
      }
      state.allTasks.push(newTask)
    },
    moveTask: (
      state,
      action: PayloadAction<{
        toIndex: number
        fromIndex: number
        toSection: TaskListType
        fromSection: TaskListType
      }>,
    ) => {
      const { fromIndex, toSection, fromSection, toIndex } = action.payload
      const fromTaskList = state[TASK_LIST_DICTIONARY[fromSection]]
      const toTaskList = state[TASK_LIST_DICTIONARY[toSection]]

      const task = fromTaskList[fromIndex]

      task.taskList = toSection

      task.completed = false
      task.bgColor = 'gray'

      switch (toSection) {
        case 'completed':
          task.completed = true
          task.bgColor = 'green'
          break
        case 'todo':
          task.completed = false
          task.bgColor = 'red'
          break
        case 'all':
          break
      }

      fromTaskList.splice(fromIndex, 1)
      toTaskList.splice(toIndex, 0, task)
    },
  },
})

export const { addTask, updateTask, moveTask } = taskSlice.actions

export default taskSlice.reducer
