import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoForm from './TodoForm'

describe('TodoForm', () => {
  it('入力フィールド、優先度セレクト、送信ボタンが表示される', () => {
    render(<TodoForm onSubmit={vi.fn()} />)

    expect(screen.getByPlaceholderText('新しいタスクを入力...')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '追加' })).toBeInTheDocument()
  })

  it('ユーザーがタスクを入力して送信できる', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()

    render(<TodoForm onSubmit={handleSubmit} />)

    const input = screen.getByPlaceholderText('新しいタスクを入力...')
    const submitButton = screen.getByRole('button', { name: '追加' })

    await user.type(input, '新しいタスク')
    await user.click(submitButton)

    expect(handleSubmit).toHaveBeenCalledWith('新しいタスク', 'medium')
  })

  it('優先度を選択して送信できる', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()

    render(<TodoForm onSubmit={handleSubmit} />)

    const input = screen.getByPlaceholderText('新しいタスクを入力...')
    const select = screen.getByRole('combobox')
    const submitButton = screen.getByRole('button', { name: '追加' })

    await user.type(input, 'タスク')
    await user.selectOptions(select, 'high')
    await user.click(submitButton)

    expect(handleSubmit).toHaveBeenCalledWith('タスク', 'high')
  })

  it('送信後に入力フィールドがクリアされる', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()

    render(<TodoForm onSubmit={handleSubmit} />)

    const input = screen.getByPlaceholderText('新しいタスクを入力...')
    const submitButton = screen.getByRole('button', { name: '追加' })

    await user.type(input, 'タスク')
    await user.click(submitButton)

    expect(input.value).toBe('')
  })

  it('送信後に優先度がmediumにリセットされる', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()

    render(<TodoForm onSubmit={handleSubmit} />)

    const input = screen.getByPlaceholderText('新しいタスクを入力...')
    const select = screen.getByRole('combobox')
    const submitButton = screen.getByRole('button', { name: '追加' })

    await user.type(input, 'タスク')
    await user.selectOptions(select, 'high')
    await user.click(submitButton)

    expect(select.value).toBe('medium')
  })

  it('空のタスクは送信されない', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()

    render(<TodoForm onSubmit={handleSubmit} />)

    const submitButton = screen.getByRole('button', { name: '追加' })

    await user.click(submitButton)

    expect(handleSubmit).not.toHaveBeenCalled()
  })

  it('空白のみのタスクは送信されない', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()

    render(<TodoForm onSubmit={handleSubmit} />)

    const input = screen.getByPlaceholderText('新しいタスクを入力...')
    const submitButton = screen.getByRole('button', { name: '追加' })

    await user.type(input, '   ')
    await user.click(submitButton)

    expect(handleSubmit).not.toHaveBeenCalled()
  })

  it('カスタムsubmitLabelが表示される', () => {
    render(<TodoForm onSubmit={vi.fn()} submitLabel="保存" />)

    expect(screen.getByRole('button', { name: '保存' })).toBeInTheDocument()
  })

  it('初期値が設定されている', () => {
    render(
      <TodoForm
        onSubmit={vi.fn()}
        initialValue="初期タスク"
        initialPriority="low"
      />
    )

    const input = screen.getByPlaceholderText('新しいタスクを入力...')
    const select = screen.getByRole('combobox')

    expect(input.value).toBe('初期タスク')
    expect(select.value).toBe('low')
  })
})
