import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FilterBar from './FilterBar'

describe('FilterBar', () => {
  it('すべてのフィルターボタンが表示される', () => {
    render(<FilterBar currentFilter="all" onFilterChange={vi.fn()} />)

    expect(screen.getByRole('button', { name: 'すべて' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '未完了' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '完了' })).toBeInTheDocument()
  })

  it('現在のフィルターにactiveクラスが付与される', () => {
    render(<FilterBar currentFilter="active" onFilterChange={vi.fn()} />)

    const activeButton = screen.getByRole('button', { name: '未完了' })
    expect(activeButton).toHaveClass('active')
  })

  it('フィルターボタンをクリックするとonFilterChangeが呼ばれる', async () => {
    const user = userEvent.setup()
    const handleFilterChange = vi.fn()

    render(<FilterBar currentFilter="all" onFilterChange={handleFilterChange} />)

    await user.click(screen.getByRole('button', { name: '完了' }))

    expect(handleFilterChange).toHaveBeenCalledWith('completed')
  })

  it('各フィルターボタンが正しい値で呼ばれる', async () => {
    const user = userEvent.setup()
    const handleFilterChange = vi.fn()

    render(<FilterBar currentFilter="all" onFilterChange={handleFilterChange} />)

    await user.click(screen.getByRole('button', { name: 'すべて' }))
    expect(handleFilterChange).toHaveBeenCalledWith('all')

    await user.click(screen.getByRole('button', { name: '未完了' }))
    expect(handleFilterChange).toHaveBeenCalledWith('active')

    await user.click(screen.getByRole('button', { name: '完了' }))
    expect(handleFilterChange).toHaveBeenCalledWith('completed')
  })
})
