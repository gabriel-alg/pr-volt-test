export interface ITask {
  id: string
  title: string
  bgColor: string
  completed: boolean
  taskList: TaskListType
}

export type TaskListType = 'all' | 'todo' | 'completed'

export interface ISection {
  id: TaskListType
  title: string
  color: string
}
