import { FC, FormEventHandler, useState } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'

import DroppableArea from './components/DropableArea'
import { useAppDispatch, useAppSelector } from './hooks/redux-hooks'
import { addTask, moveTask } from './store/slices/taskSlice'

import { SECTION_LIST } from './contants'

import { TaskListType } from './types'

const App: FC = () => {
  const dispatch = useAppDispatch()
  const [input, setInput] = useState('')

  const allTaskList = useAppSelector(state => state.tasks.allTasks)
  const todoTaskList = useAppSelector(state => state.tasks.todoTaskList)
  const completedTaskList = useAppSelector(
    state => state.tasks.completedTaskList,
  )

  const taskLists = {
    all: allTaskList,
    todo: todoTaskList,
    completed: completedTaskList,
  }

  const handleAddTask: FormEventHandler = e => {
    e.preventDefault()

    if (input.length > 0 && input.length <= 50) {
      dispatch(addTask({ title: input }))
      setInput('')
    }
  }

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return

    dispatch(
      moveTask({
        fromIndex: result.source.index,
        toIndex: result.destination.index,
        fromSection: result.source.droppableId as TaskListType,
        toSection: result.destination.droppableId as TaskListType,
      }),
    )
  }

  return (
    <div className="h-screen w-screen bg-gray-200 p-4">
      <form className="flex space-x-2" onSubmit={handleAddTask}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a task..."
          className="w-full rounded-lg border-gray-300 p-3 text-sm placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <button className="rounded-full border-2 border-transparent bg-blue-600 px-6 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg">
          Add
        </button>
      </form>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="mx-auto mt-6 flex max-w-screen-xl">
          {SECTION_LIST.map(section => (
            <Droppable key={section.id} droppableId={section.id}>
              {provided => (
                <DroppableArea
                  provided={provided}
                  section={section}
                  taskList={taskLists[section.id]}
                />
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

export default App
