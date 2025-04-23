import React, { useEffect, useState } from 'react';
import './tasks.css';

const initialStatuses = ['To Do', 'In Progress', 'Done'];
const priorities = ['Low', 'Medium', 'High'];

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    status: 'To Do',
    priority: 'Medium',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const addOrUpdateTask = () => {
    if (!newTask.title || !newTask.assignedTo) {
      return alert('Title and Assignee are required!');
    }

    if (editingId) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingId ? { ...newTask, id: editingId } : task
      );
      setTasks(updatedTasks);
      setEditingId(null);
    } else {
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
    }

    setNewTask({ title: '', description: '', assignedTo: '', status: 'To Do', priority: 'Medium' });
  };

  const editTask = (task) => {
    setNewTask(task);
    setEditingId(task.id);
  };

  const deleteTask = (id) => {
    if (window.confirm('Delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const onDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const onDrop = (e, newStatus) => {
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    const updated = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updated);
  };

  const onDragOver = (e) => e.preventDefault();

  return (
    <div className="todo-container">
      <div className="add-task-form">
        <input name="title" placeholder="Task Title" value={newTask.title} onChange={handleInputChange} />
        <input name="description" placeholder="Description" value={newTask.description} onChange={handleInputChange} />
        <input name="assignedTo" placeholder="Assigned To" value={newTask.assignedTo} onChange={handleInputChange} />
        
        <select name="status" value={newTask.status} onChange={handleInputChange}>
          {initialStatuses.map((s, i) => <option key={i} value={s}>{s}</option>)}
        </select>
        <select name="priority" value={newTask.priority} onChange={handleInputChange}>
          {priorities.map((p, i) => <option key={i} value={p}>{p}</option>)}
        </select>

        <button onClick={addOrUpdateTask}>{editingId ? 'Update' : '+ Add Task'}</button>
      </div>

      <div className="board">
        {initialStatuses.map(status => (
          <div
            key={status}
            className="column"
            onDrop={(e) => onDrop(e, status)}
            onDragOver={onDragOver}
          >
            <h3>{status}</h3>
            {tasks.filter(t => t.status === status).map(task => (
              <div
                key={task.id}
                className={`task-card priority-${task.priority.toLowerCase()}`}
                draggable
                onDragStart={(e) => onDragStart(e, task.id)}
              >
                <strong>{task.title}</strong>
                <p>{task.description}</p>
                <p><b>Assigned:</b> {task.assignedTo}</p>
                <p><b>Priority:</b> {task.priority}</p>
                <div className="task-actions">
                  <button className="edit-btn" onClick={() => editTask(task)}>Edit</button>
                  <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
