import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StoreProvider, useStore } from '../store'

function Trigger(){
  const { state, dispatch } = useStore()
  return <div>
    <div data-testid="unread">{state.conversations.find(c=>c.id==='conv-2')?.unread}</div>
    <button onClick={()=>dispatch({type:'receive-message', convId:'conv-2', message:{id:'m3', from:'Bob', text:'Hi', timestamp:Date.now()}})}>recv</button>
  </div>
}

describe('store', ()=>{
  test('receive-message increments unread', async ()=>{
    render(<StoreProvider><Trigger /></StoreProvider>)
    expect(screen.getByTestId('unread').textContent).toBe('0')
    await userEvent.click(screen.getByText('recv'))
    expect(screen.getByTestId('unread').textContent).toBe('1')
  })
})