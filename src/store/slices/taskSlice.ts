import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import { ITask } from '../../types'

interface IState {
  taskList: ITask[]
}

const initialState: IState = {
  taskList: [],
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<ITask, 'id'>>) => {
      const newtask: ITask = {
        id: uuidv4(),
        ...action.payload,
      }
      state.taskList = [...state.taskList, newtask]
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.taskList.find(task => task.id === action.payload)
      if (task) {
        task.completed = !task.completed
      }
    },
    updateTask: (state, action: PayloadAction<ITask>) => {
      const index = state.taskList.findIndex(
        task => task.id === action.payload.id,
      )
      if (index !== -1) {
        state.taskList[index] = action.payload
      }
    },
    moveTask: (
      state,
      action: PayloadAction<{
        fromIndex: number
        toIndex: number
        toCompleted?: boolean
      }>,
    ) => {
      const { fromIndex, toIndex, toCompleted } = action.payload

      if (fromIndex !== toIndex && toCompleted === undefined) {
        const [movedTask] = state.taskList.splice(fromIndex, 1)
        state.taskList.splice(toIndex, 0, movedTask)
      }

      if (typeof toCompleted === 'boolean') {
        const task = state.taskList[fromIndex]
        if (task) {
          task.completed = toCompleted
          state.taskList.splice(fromIndex, 1)
          state.taskList.splice(toIndex, 0, task)
        }
      }
    },
  },
})

export const { toggleTask, addTask, updateTask, moveTask } = taskSlice.actions

export default taskSlice.reducer
