import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../redux/slices/tasksSlice'

const TaskInput = () => {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('medium')
  const [location, setLocation] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    
    const newTask = {
      id: Date.now(),
      text,
      priority,
      location,
      completed: false,
      createdAt: new Date().toISOString()
    }
    
    dispatch(addTask(newTask))
    setText('')
    setLocation('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div className="flex gap-2 flex-col sm:flex-row">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task"
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          required
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (optional)"
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <select 
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button 
          type="submit"
          className="px-4 py-2 bg-primary-500 text-amber-100 cursor-pointer border bg-amber-800 border-b-gray-600 rounded-lg hover:bg-primary-600 transition-colors"
        >
          Add Task
        </button>
      </div>
    </form>
  )
}

export default TaskInput