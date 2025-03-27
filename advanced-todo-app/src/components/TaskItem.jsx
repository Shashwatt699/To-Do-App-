import { useDispatch } from 'react-redux';
import { deleteTask, toggleComplete } from '../redux/slices/tasksSlice';
import WeatherInfo from './WeatherInfo';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <li className={`p-4 bg-white rounded-lg shadow mb-2 ${task.completed ? 'opacity-70' : ''} task-priority-${task.priority}`}>
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => dispatch(toggleComplete(task.id))}
            className="h-5 w-5 text-primary-500 rounded focus:ring-primary-500"
          />
          <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {task.text}
          </span>
        </div>
        <button
          onClick={() => dispatch(deleteTask(task.id))}
          className="text-red-500 hover:text-red-700"
        >
          {/* Trash icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Weather Info */}
      {task.location && <WeatherInfo location={task.location} />}

      {/* Priority and Date */}
      <div className="mt-2 flex justify-between items-center">
        <span className={`text-xs px-2 py-1 rounded-full ${
          task.priority === 'high' ? 'bg-red-100 text-red-800' :
          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {task.priority} priority
        </span>
        <span className="text-xs text-gray-500">
          {new Date(task.createdAt).toLocaleString()}
        </span>
      </div>
    </li>
  );
};

export default TaskItem;