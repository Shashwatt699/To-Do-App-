import { useSelector } from 'react-redux'
import TaskItem from './TaskItem'

const TaskList = () => {
  // Access tasks directly from the tasks slice
  const tasks = useSelector(state => state.tasks.tasks)

  return (
    <div className="space-y-3 mt-4">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No tasks found. Add your first task!
        </p>
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