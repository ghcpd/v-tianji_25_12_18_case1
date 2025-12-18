import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders chat app components', () => {
  render(<App />);
  expect(screen.getByText(/Conversations/i)).toBeInTheDocument();
  expect(screen.getByText(/Contacts/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Search chat history/i)).toBeInTheDocument();
});
