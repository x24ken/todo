import { describe, it, expect, beforeEach } from 'vitest'
import { todoApi } from './todoApi'

describe('todoApi', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('getTodos', () => {
    it('空のLocalStorageから空の配列を取得する', async () => {
      const todos = await todoApi.getTodos()
      expect(todos).toEqual([])
    })

    it('LocalStorageに保存されたTodoを取得する', async () => {
      const mockTodos = [
        { id: '1', title: 'テスト1', completed: false, priority: 'high', createdAt: '2024-01-01' },
        { id: '2', title: 'テスト2', completed: true, priority: 'low', createdAt: '2024-01-02' }
      ]
      localStorage.setItem('todos', JSON.stringify(mockTodos))

      const todos = await todoApi.getTodos()
      expect(todos).toEqual(mockTodos)
      expect(todos).toHaveLength(2)
    })

    it('不正なJSONデータの場合は空の配列を返す', async () => {
      localStorage.setItem('todos', 'invalid json')
      const todos = await todoApi.getTodos()
      expect(todos).toEqual([])
    })
  })

  describe('createTodo', () => {
    it('新しいTodoを作成してLocalStorageに保存する', async () => {
      const title = 'テストタスク'
      const priority = 'high'

      const newTodo = await todoApi.createTodo(title, priority)

      expect(newTodo).toMatchObject({
        title: 'テストタスク',
        completed: false,
        priority: 'high'
      })
      expect(newTodo.id).toBeDefined()
      expect(newTodo.createdAt).toBeDefined()

      // LocalStorageに保存されたか確認
      const saved = JSON.parse(localStorage.getItem('todos'))
      expect(saved).toHaveLength(1)
      expect(saved[0]).toEqual(newTodo)
    })

    it('優先度を指定しない場合はmediumになる', async () => {
      const newTodo = await todoApi.createTodo('タスク')
      expect(newTodo.priority).toBe('medium')
    })

    it('空のタイトルでエラーを投げる', async () => {
      await expect(todoApi.createTodo('')).rejects.toThrow('Title is required')
      await expect(todoApi.createTodo('   ')).rejects.toThrow('Title is required')
    })

    it('複数のTodoを順次作成できる', async () => {
      await todoApi.createTodo('タスク1', 'high')
      await todoApi.createTodo('タスク2', 'low')

      const todos = await todoApi.getTodos()
      expect(todos).toHaveLength(2)
      expect(todos[0].title).toBe('タスク1')
      expect(todos[1].title).toBe('タスク2')
    })

    it('前後の空白をトリムする', async () => {
      const newTodo = await todoApi.createTodo('  タスク  ', 'high')
      expect(newTodo.title).toBe('タスク')
    })
  })

  describe('updateTodo', () => {
    it('Todoのタイトルを更新する', async () => {
      const todo = await todoApi.createTodo('元のタイトル', 'medium')

      const updated = await todoApi.updateTodo(todo.id, { title: '新しいタイトル' })

      expect(updated.title).toBe('新しいタイトル')
      expect(updated.id).toBe(todo.id)
      expect(updated.priority).toBe('medium')
    })

    it('Todoの完了状態を更新する', async () => {
      const todo = await todoApi.createTodo('タスク', 'high')
      expect(todo.completed).toBe(false)

      const updated = await todoApi.updateTodo(todo.id, { completed: true })

      expect(updated.completed).toBe(true)
      expect(updated.title).toBe('タスク')
    })

    it('Todoの優先度を更新する', async () => {
      const todo = await todoApi.createTodo('タスク', 'low')

      const updated = await todoApi.updateTodo(todo.id, { priority: 'high' })

      expect(updated.priority).toBe('high')
    })

    it('複数のフィールドを同時に更新する', async () => {
      const todo = await todoApi.createTodo('タスク', 'low')

      const updated = await todoApi.updateTodo(todo.id, {
        title: '更新タスク',
        completed: true,
        priority: 'high'
      })

      expect(updated.title).toBe('更新タスク')
      expect(updated.completed).toBe(true)
      expect(updated.priority).toBe('high')
    })

    it('存在しないIDでエラーを投げる', async () => {
      await expect(
        todoApi.updateTodo('non-existent-id', { title: 'test' })
      ).rejects.toThrow('Todo not found')
    })

    it('LocalStorageに更新が反映される', async () => {
      const todo = await todoApi.createTodo('タスク', 'low')
      await todoApi.updateTodo(todo.id, { title: '更新済み' })

      const todos = await todoApi.getTodos()
      expect(todos[0].title).toBe('更新済み')
    })
  })

  describe('deleteTodo', () => {
    it('Todoを削除する', async () => {
      const todo = await todoApi.createTodo('削除するタスク')

      await todoApi.deleteTodo(todo.id)

      const todos = await todoApi.getTodos()
      expect(todos).toHaveLength(0)
    })

    it('複数のTodoから特定のTodoを削除する', async () => {
      const todo1 = await todoApi.createTodo('タスク1')
      const todo2 = await todoApi.createTodo('タスク2')
      const todo3 = await todoApi.createTodo('タスク3')

      await todoApi.deleteTodo(todo2.id)

      const todos = await todoApi.getTodos()
      expect(todos).toHaveLength(2)
      expect(todos.find(t => t.id === todo1.id)).toBeDefined()
      expect(todos.find(t => t.id === todo2.id)).toBeUndefined()
      expect(todos.find(t => t.id === todo3.id)).toBeDefined()
    })

    it('存在しないIDでエラーを投げる', async () => {
      await expect(
        todoApi.deleteTodo('non-existent-id')
      ).rejects.toThrow('Todo not found')
    })

    it('LocalStorageから削除される', async () => {
      const todo = await todoApi.createTodo('タスク')
      await todoApi.deleteTodo(todo.id)

      const saved = localStorage.getItem('todos')
      expect(JSON.parse(saved)).toEqual([])
    })
  })

  describe('統合テスト', () => {
    it('CRUD操作の完全なフロー', async () => {
      // Create
      const todo1 = await todoApi.createTodo('買い物', 'high')
      const todo2 = await todoApi.createTodo('掃除', 'medium')

      let todos = await todoApi.getTodos()
      expect(todos).toHaveLength(2)

      // Update
      await todoApi.updateTodo(todo1.id, { completed: true })

      todos = await todoApi.getTodos()
      expect(todos.find(t => t.id === todo1.id).completed).toBe(true)

      // Delete
      await todoApi.deleteTodo(todo2.id)

      todos = await todoApi.getTodos()
      expect(todos).toHaveLength(1)
      expect(todos[0].id).toBe(todo1.id)
    })
  })
})
