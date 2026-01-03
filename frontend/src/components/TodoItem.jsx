import { useState } from 'react';

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editPriority, setEditPriority] = useState(todo.priority);

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, { title: editTitle, priority: editPriority });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditPriority(todo.priority);
    setIsEditing(false);
  };

  const priorityLabels = {
    high: '高',
    medium: '中',
    low: '低',
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="edit-input"
          autoFocus
        />
        <select
          value={editPriority}
          onChange={(e) => setEditPriority(e.target.value)}
          className="edit-priority"
        >
          <option value="high">高</option>
          <option value="medium">中</option>
          <option value="low">低</option>
        </select>
        <button onClick={handleSave} className="save-btn">保存</button>
        <button onClick={handleCancel} className="cancel-btn">キャンセル</button>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, !todo.completed)}
        className="todo-checkbox"
      />
      <div className="todo-content">
        <span className="todo-title">{todo.title}</span>
        <span className="todo-priority">{priorityLabels[todo.priority]}</span>
      </div>
      <div className="todo-actions">
        <button onClick={() => setIsEditing(true)} className="edit-btn">編集</button>
        <button onClick={() => onDelete(todo.id)} className="delete-btn">削除</button>
      </div>
    </div>
  );
}
