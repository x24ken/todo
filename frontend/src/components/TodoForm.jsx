import { useState } from 'react';

export default function TodoForm({ onSubmit, initialValue = '', initialPriority = 'medium', submitLabel = '追加' }) {
  const [title, setTitle] = useState(initialValue);
  const [priority, setPriority] = useState(initialPriority);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title, priority);
      setTitle('');
      setPriority('medium');
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="新しいタスクを入力..."
        className="todo-input"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="priority-select"
      >
        <option value="high">高</option>
        <option value="medium">中</option>
        <option value="low">低</option>
      </select>
      <button type="submit" className="submit-btn">
        {submitLabel}
      </button>
    </form>
  );
}
