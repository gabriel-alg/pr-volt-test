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
