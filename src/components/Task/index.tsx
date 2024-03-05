import React, { FC, useState } from 'react'
import { useAppDispatch } from '../../hooks/redux-hooks.ts'
import { ITask } from '../../types'
import { updateTask } from '../../store/slices/taskSlice.ts' // Import the action to update a task

interface TaskProps {
  task: ITask
}

const Task: FC<TaskProps> = ({ task }) => {
  const dispatch = useAppDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [bgColor, setBgColor] = useState(task.bgColor)

  const handleSave = () => {
    dispatch(updateTask({ ...task, title, bgColor }))
    setIsEditing(false)
  }

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBgColor(event.target.value)
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  return (
    <div
      className={`cursor-pointer overflow-hidden rounded-lg shadow-lg ${isEditing ? 'ring-2 ring-blue-300' : ''}`}
      style={{ borderTopColor: bgColor }}
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <div className="flex flex-col">
          <input
            type="color"
            value={bgColor}
            onChange={handleColorChange}
            className="w-full"
          />
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="p-2"
          />
          <div className="flex justify-end space-x-2 p-2">
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col justify-between">
          <div
            className="bg-opacity-50 p-4"
            style={{ backgroundColor: bgColor }}
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
