import React from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'
import { useChatStore } from '../store/chatStore'
import { initialConversations, initialContacts } from '../data/mock'

function renderApp() {
  return render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

describe('Chat UI', () => {

  beforeEach(() => {
    // reset store to initial mock data by reassigning initial state
    useChatStore.setState({ conversations: initialConversations, contacts: initialContacts, currentConversationId: initialConversations[0].id })
  })

  test('sends a message and shows it in chat window', async () => {
    renderApp()
    const user = userEvent.setup()
    const input = screen.getByLabelText('Message input') as HTMLInputElement
    await user.type(input, 'Hello from test')
    await user.click(screen.getByText('Send'))

    // new message should appear inside the chat main region
    const main = screen.getByRole('main')
    expect(await within(main).findByText('Hello from test')).toBeInTheDocument()
  })

  test('search filters conversations by title and message', async () => {
    renderApp()
    const user = userEvent.setup()
    const search = screen.getByLabelText('Search') as HTMLInputElement
    // search for 'bob' should reveal Bob conversation
    await user.type(search, 'bob')
    expect(await screen.findByRole('button', { name: /bob/i })).toBeInTheDocument()
    // search for a snippet from Alice's message
    await user.clear(search)
    await user.type(search, 'how are you')
    expect(await screen.findByRole('button', { name: /alice/i })).toBeInTheDocument()
    // search for nonsense should hide all
    await user.clear(search)
    await user.type(search, 'zzzzzz')
    expect(screen.queryByRole('button', { name: /Alice/i })).not.toBeInTheDocument()
  })

  test('can add a contact', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    const user = userEvent.setup()
    // navigate to contacts
    await user.click(screen.getByText('Contacts'))
    const input = await screen.findByPlaceholderText('New contact name')
    await user.type(input, 'Daniel')
    await user.click(screen.getByText('Add'))
    expect(await screen.findByText('Daniel')).toBeInTheDocument()
  })
})
