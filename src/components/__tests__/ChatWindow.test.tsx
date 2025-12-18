import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChatWindow from '../ChatWindow'
import { StoreProvider } from '../../state/store'

describe('ChatWindow', () => {
  test('sends a message when clicking send', async () => {
    render(<StoreProvider><ChatWindow /></StoreProvider>)
    const input = screen.getByLabelText('message-input') as HTMLInputElement
    const sendButton = screen.getByLabelText('send-button')

    await userEvent.type(input, 'hello')
    await userEvent.click(sendButton)

    expect(input.value).toBe('')
    expect(await screen.findByText('hello')).toBeTruthy()
  })

  test('pressing enter sends the message', async () => {
    render(<StoreProvider><ChatWindow /></StoreProvider>)
    const input = screen.getByLabelText('message-input') as HTMLInputElement
    await userEvent.type(input, 'test enter{enter}')
    expect(await screen.findByText('test enter')).toBeTruthy()
  })
})
