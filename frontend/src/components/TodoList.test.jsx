import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TodoList from './TodoList'

describe('TodoList', () => {
  const mockTodos = [
    { id: '1', title: 'タスク1', completed: false, priority: 'high', createdAt: '2024-01-01' },
    { id: '2', title: 'タスク2', completed: true, priority: 'medium', createdAt: '2024-01-02' },
    { id: '3', title: 'タスク3', completed: false, priority: 'low', createdAt: '2024-01-03' }
  ]

  it('Todoリストが表示される', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
        onUpdate={vi.fn()}
      />
    )

    expect(screen.getByText('タスク1')).toBeInTheDocument()
    expect(screen.getByText('タスク2')).toBeInTheDocument()
    expect(screen.getByText('タスク3')).toBeInTheDocument()
  })

  it('Todoが空の場合、空の状態メッセージが表示される', () => {
    render(
      <TodoList
        todos={[]}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
        onUpdate={vi.fn()}
      />
    )

    expect(screen.getByText('タスクがありません')).toBeInTheDocument()
  })

  it('Todoの数だけアイテムが表示される', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
        onUpdate={vi.fn()}
      />
    )

    const todoItems = screen.getAllByRole('checkbox')
    expect(todoItems).toHaveLength(3)
  })
})
