import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';
import { todoApi } from './api/todoApi';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 初期データ読み込み
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await todoApi.getTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Todoの読み込みに失敗しました');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 新規Todo追加
  const handleAddTodo = async (title, priority) => {
    try {
      const newTodo = await todoApi.createTodo(title, priority);
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError('Todoの追加に失敗しました');
      console.error(err);
    }
  };

  // Todo完了切り替え
  const handleToggleTodo = async (id, completed) => {
    try {
      const updatedTodo = await todoApi.updateTodo(id, { completed });
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (err) {
      setError('Todoの更新に失敗しました');
      console.error(err);
    }
  };

  // Todo削除
  const handleDeleteTodo = async (id) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Todoの削除に失敗しました');
      console.error(err);
    }
  };

  // Todo更新
  const handleUpdateTodo = async (id, updates) => {
    try {
      const updatedTodo = await todoApi.updateTodo(id, updates);
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (err) {
      setError('Todoの更新に失敗しました');
      console.error(err);
    }
  };

  // フィルタリング
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // 統計
  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  };

  if (loading) {
    return <div className="app loading">読み込み中...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo アプリ</h1>
        <div className="stats">
          <span>全体: {stats.total}</span>
          <span>未完了: {stats.active}</span>
          <span>完了: {stats.completed}</span>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      <main className="app-main">
        <TodoForm onSubmit={handleAddTodo} />
        <FilterBar currentFilter={filter} onFilterChange={setFilter} />
        <TodoList
          todos={filteredTodos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
          onUpdate={handleUpdateTodo}
        />
      </main>
    </div>
  );
}

export default App;
