import { FC, FormEventHandler, useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import { useAppDispatch, useAppSelector } from './hooks/redux-hooks'
import { addTask, moveTask } from './store/slices/taskSlice'

const App: FC = () => {
  const dispatch = useAppDispatch()
  const [input, setInput] = useState('')
  const [bgColor] = useState('#ffffff')

  const tasks = useAppSelector(state => state.tasks.taskList)

  const handleAddTask: FormEventHandler = e => {
    e.preventDefault()

    if (input.length > 0 && input.length <= 50) {
      dispatch(addTask({ title: input, bgColor, completed: false }))
      setInput('')
    }
  }

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return

    dispatch(
      moveTask({
        fromIndex: result.source.index,
        toIndex: result.destination.index,
        toCompleted: result.destination.droppableId === 'completedTasks',
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
        <Droppable droppableId="uncompletedTasks">
          {provided => (
            <div
              className="mt-4 rounded bg-blue-100 p-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <h2 className="mb-2 text-lg font-bold">Tasks to do</h2>
              {tasks
                .filter(task => !task.completed)
                .map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`mb-2 cursor-move rounded p-2 shadow-lg ${task.bgColor}`}
                      >
                        {task.title}
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="completedTasks">
          {provided => (
            <div
              className="mt-6 rounded bg-green-100 p-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <h2 className="mb-2 text-lg font-bold">Completed Tasks</h2>
              {tasks
                .filter(task => task.completed)
                .map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`mb-2 cursor-move rounded p-2 shadow-lg ${task.bgColor}`}
                      >
                        {task.title}
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default App
