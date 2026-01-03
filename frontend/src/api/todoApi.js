const STORAGE_KEY = 'todos';

// LocalStorageからデータを読み込む
const getTodosFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to read from localStorage:', error);
    return [];
  }
};

// LocalStorageにデータを保存する
const saveTodosToStorage = (todos) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    throw new Error('Failed to save data');
  }
};

// UUIDを生成（簡易版）
const generateId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const todoApi = {
  // 全Todo取得
  async getTodos() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getTodosFromStorage());
      }, 100); // ネットワーク遅延をシミュレート
    });
  },

  // 新規Todo作成
  async createTodo(title, priority = 'medium') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (!title || title.trim() === '') {
            reject(new Error('Title is required'));
            return;
          }

          const todos = getTodosFromStorage();
          const newTodo = {
            id: generateId(),
            title: title.trim(),
            completed: false,
            priority,
            createdAt: new Date().toISOString(),
          };

          todos.push(newTodo);
          saveTodosToStorage(todos);
          resolve(newTodo);
        } catch (error) {
          reject(error);
        }
      }, 100);
    });
  },

  // Todo更新
  async updateTodo(id, updates) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const todos = getTodosFromStorage();
          const todoIndex = todos.findIndex((t) => t.id === id);

          if (todoIndex === -1) {
            reject(new Error('Todo not found'));
            return;
          }

          const updatedTodo = {
            ...todos[todoIndex],
            ...(updates.title !== undefined && { title: updates.title.trim() }),
            ...(updates.completed !== undefined && { completed: updates.completed }),
            ...(updates.priority !== undefined && { priority: updates.priority }),
          };

          todos[todoIndex] = updatedTodo;
          saveTodosToStorage(todos);
          resolve(updatedTodo);
        } catch (error) {
          reject(error);
        }
      }, 100);
    });
  },

  // Todo削除
  async deleteTodo(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const todos = getTodosFromStorage();
          const filteredTodos = todos.filter((t) => t.id !== id);

          if (todos.length === filteredTodos.length) {
            reject(new Error('Todo not found'));
            return;
          }

          saveTodosToStorage(filteredTodos);
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 100);
    });
  },
};
