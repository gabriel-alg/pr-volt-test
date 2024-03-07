import { ChangeEvent, FC, MouseEventHandler, useState } from 'react'
import { useAppDispatch } from '../../hooks/redux-hooks.ts'
import { ITask } from '../../types'
import { updateTask } from '../../store/slices/taskSlice.ts'

interface TaskProps {
  task: ITask
}

const Task: FC<TaskProps> = ({ task }) => {
  const dispatch = useAppDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)

  const handleSave: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation()
    dispatch(updateTask({ ...task, title }))
    setIsEditing(false)
  }

  const handleCancel: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation()
    setIsEditing(false)
    setTitle(task.title)
  }

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  return (
    <div
      className={`cursor-pointer overflow-hidden rounded-lg shadow-lg ${isEditing ? 'ring-2 ring-blue-300' : ''}`}
      style={{ borderTopColor: task.bgColor }}
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <form className="flex flex-col">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="p-2"
          />
          <div className="flex justify-end space-x-2 p-2">
            <button onClick={handleSave}>Save</button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex h-full flex-col justify-between">
          <div
            className="bg-opacity-50 p-4"
            style={{ backgroundColor: task.bgColor }}
          />
          <div className="bg-white p-4">
            <p className="text-lg font-semibold">{title}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Task
