import { FC } from 'react'
import { Draggable, DroppableProvided } from 'react-beautiful-dnd'

import Task from '../Task'

import { ISection, ITask } from '../../types'
import { twMerge } from 'tailwind-merge'
import { SECTION_BG_COLOR_DICTIONARY } from '../../contants'

interface IDroppableArea {
  provided: DroppableProvided
  section: ISection
  taskList: ITask[]
}

const DroppableArea: FC<IDroppableArea> = ({ provided, section, taskList }) => (
  <div
    className={twMerge(
      'flex w-1/2 flex-col gap-2 rounded p-4',
      SECTION_BG_COLOR_DICTIONARY[section.id],
    )}
    {...provided.droppableProps}
    ref={provided.innerRef}
  >
    <div className="flex w-full justify-between">
      <h2 className="mb-2 text-lg font-bold">{section.title}</h2>
      <p className="mb-2 text-lg font-bold">{taskList.length}</p>
    </div>
    {taskList.map((task, index) => (
      <Draggable key={task.id} draggableId={task.id} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Task task={task} />
          </div>
        )}
      </Draggable>
    ))}
    {provided.placeholder}
  </div>
)

export default DroppableArea
