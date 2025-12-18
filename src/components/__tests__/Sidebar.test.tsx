import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Sidebar from '../Sidebar'
import { StoreProvider } from '../../state/store'

describe('Sidebar', () => {
  test('search filters conversations', async () => {
    render(<StoreProvider><Sidebar /></StoreProvider>)
    const search = screen.getByLabelText('search') as HTMLInputElement
    await userEvent.type(search, 'bob')
    const item = screen.getByRole('listitem')
    expect(item).toHaveTextContent('Bob')
    expect(screen.queryByText('Project Team')).toBeNull()
  })

  test('add contact prompts', async () => {
    render(<StoreProvider><Sidebar /></StoreProvider>)
    window.prompt = vi.fn().mockReturnValue('Charlie')
    const addBtn = screen.getByText('Add')
    await userEvent.click(addBtn)
    expect(screen.getByText('Charlie')).toBeTruthy()
  })
})
