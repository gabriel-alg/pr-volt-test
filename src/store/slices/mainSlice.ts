import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ITask } from '../../types'

interface UserProfileType {
  taskList: ITask[]
}

const initialState: UserProfileType = {
  taskList: [],
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setTaskList(state, action: PayloadAction<ITask[]>) {
      state.taskList = action.payload
    },
  },
  // extraReducers: builder => {
  // },
})

export const { setTaskList } = mainSlice.actions

export default mainSlice.reducer
