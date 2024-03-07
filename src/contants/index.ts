import { ISection } from '../types'

export const SECTION_LIST: ISection[] = [
  { id: 'all', title: 'All Tasks', color: 'gray' },
  { id: 'todo', title: 'Tasks to do', color: 'blue' },
  { id: 'completed', title: 'Completed Tasks', color: 'green' },
]

export const TASK_LIST_DICTIONARY = {
  all: 'allTasks',
  todo: 'todoTaskList',
  completed: 'completedTaskList',
} as const

export const SECTION_BG_COLOR_DICTIONARY = {
  all: 'bg-gray-100',
  todo: 'bg-blue-100',
  completed: 'bg-green-100',
} as const
