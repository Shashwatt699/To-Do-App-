import { useSelector } from 'react-redux'
import TaskItem from './TaskItem'

const TaskList = () => {
  const tasks = useSelector(state => state.tasks.tasks)

  return (
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No tasks found. Add a task to get started!</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default TaskList