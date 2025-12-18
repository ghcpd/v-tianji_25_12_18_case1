import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import App from './App'

describe('Real-Time Chat UI', ()=>{
  test('renders app and shows threads', ()=>{
    render(<App />)
    expect(screen.getByTestId('app')).toBeInTheDocument()
    expect(screen.getByText(/Real-Time Chat/i)).toBeInTheDocument()
    // threads count (from initial data)
    expect(screen.getByText(/3 threads/)).toBeInTheDocument()
  })

  test('selecting a thread clears unread count', async ()=>{
    render(<App />)
    const t3 = screen.getByTestId('thread-t3')
    // t3 had unread badge
    expect(screen.getByTestId('unread-t3')).toBeInTheDocument()
    // click it
    userEvent.click(t3)
    await waitFor(()=>{
      expect(screen.queryByTestId('unread-t3')).not.toBeInTheDocument()
    })
  })

  test('send message adds message and receives auto-reply (timers)', async ()=>{
    vi.useFakeTimers()
    render(<App />)
    // ensure active thread is first one (t1)
    const input = screen.getByTestId('composer-input')
    const send = screen.getByTestId('send-btn')
    // type and send
    await userEvent.type(input, 'Hello from test')
    userEvent.click(send)
    // immediately our message should appear
    expect(screen.getByText('Hello from test')).toBeInTheDocument()

    // advance timers to allow auto-reply
    vi.advanceTimersByTime(400)
    await waitFor(()=>{
      expect(screen.getByText(/Got your message:/)).toBeInTheDocument()
    })
    vi.useRealTimers()
  })

  test('search filters conversations and messages', async ()=>{
    render(<App />)
    const search = screen.getByTestId('search-input')
    await userEvent.clear(search)
    await userEvent.type(search, 'coffee')
    // Only "Coffee buddies" should be visible
    expect(screen.getByText(/Coffee buddies/i)).toBeInTheDocument()
    // other threads absent
    expect(screen.queryByText(/General/)).not.toBeInTheDocument()
  })

  test('can add contact', async ()=>{
    render(<App />)
    const input = screen.getByTestId('contact-input')
    const btn = screen.getByTestId('add-contact')
    await userEvent.type(input, 'New Person')
    userEvent.click(btn)
    expect(await screen.findByText('New Person')).toBeInTheDocument()
  })
})
