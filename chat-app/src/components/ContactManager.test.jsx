import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ChatProvider } from '../context/ChatContext';
import { ContactManager } from './ContactManager';

const Wrapper = ({ children }) => <ChatProvider>{children}</ChatProvider>;

describe('ContactManager Component', () => {
  it('should render contact manager when open', () => {
    render(
      <ContactManager isOpen={true} onClose={() => {}} />,
      { wrapper: Wrapper }
    );
    expect(screen.getByText('Manage Contacts')).toBeInTheDocument();
  });

  it('should not render when closed', () => {
    const { container } = render(
      <ContactManager isOpen={false} onClose={() => {}} />,
      { wrapper: Wrapper }
    );
    expect(container.querySelector('.modal-content')).not.toBeInTheDocument();
  });

  it('should display all contacts', () => {
    render(
      <ContactManager isOpen={true} onClose={() => {}} />,
      { wrapper: Wrapper }
    );
    
    expect(screen.getByTestId('contact-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('contact-item-2')).toBeInTheDocument();
  });

  it('should show contact name and status', () => {
    render(
      <ContactManager isOpen={true} onClose={() => {}} />,
      { wrapper: Wrapper }
    );
    
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    // There are multiple "online" statuses, so we need to be more specific
    const statuses = screen.getAllByText('online');
    expect(statuses.length).toBeGreaterThan(0);
  });

  it('should close modal when close button clicked', () => {
    const onClose = vi.fn();
    render(
      <ContactManager isOpen={true} onClose={onClose} />,
      { wrapper: Wrapper }
    );
    
    const closeBtn = screen.getByRole('button', { name: '✕' });
    fireEvent.click(closeBtn);
    
    expect(onClose).toHaveBeenCalled();
  });

  it('should close modal when overlay clicked', () => {
    const onClose = vi.fn();
    const { container } = render(
      <ContactManager isOpen={true} onClose={onClose} />,
      { wrapper: Wrapper }
    );
    
    const overlay = container.querySelector('.modal-overlay');
    fireEvent.click(overlay);
    
    expect(onClose).toHaveBeenCalled();
  });

  it('should not close modal when content clicked', () => {
    const onClose = vi.fn();
    const { container } = render(
      <ContactManager isOpen={true} onClose={onClose} />,
      { wrapper: Wrapper }
    );
    
    const content = container.querySelector('.modal-content');
    fireEvent.click(content);
    
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should add new contact', () => {
    render(
      <ContactManager isOpen={true} onClose={() => {}} />,
      { wrapper: Wrapper }
    );
    
    const input = screen.getByTestId('new-contact-input');
    const addBtn = screen.getByTestId('add-contact-btn');

    fireEvent.change(input, { target: { value: 'John Doe' } });
    fireEvent.click(addBtn);

    expect(input.value).toBe('');
  });

  it('should display chat button for each contact', () => {
    render(
      <ContactManager isOpen={true} onClose={() => {}} />,
      { wrapper: Wrapper }
    );
    
    expect(screen.getByTestId('chat-btn-1')).toBeInTheDocument();
    expect(screen.getByTestId('chat-btn-2')).toBeInTheDocument();
  });

  it('should display delete button for each contact', () => {
    render(
      <ContactManager isOpen={true} onClose={() => {}} />,
      { wrapper: Wrapper }
    );
    
    expect(screen.getByTestId('delete-btn-1')).toBeInTheDocument();
    expect(screen.getByTestId('delete-btn-2')).toBeInTheDocument();
  });

  it('should start chat with contact', () => {
    const onClose = vi.fn();
    render(
      <ContactManager isOpen={true} onClose={onClose} />,
      { wrapper: Wrapper }
    );
    
    const chatBtn = screen.getByTestId('chat-btn-1');
    fireEvent.click(chatBtn);

    // onClose should be called when chat is started
    expect(onClose).toHaveBeenCalled();
  });

  it('should display contact count', () => {
    render(
      <ContactManager isOpen={true} onClose={() => {}} />,
      { wrapper: Wrapper }
    );
    
    expect(screen.getByText(/Contacts \(\d+\)/)).toBeInTheDocument();
  });

  it('should not add empty contact', () => {
    render(
      <ContactManager isOpen={true} onClose={() => {}} />,
      { wrapper: Wrapper }
    );
    
    const addBtn = screen.getByTestId('add-contact-btn');
    const contactsBefore = screen.getByText(/Contacts \(\d+\)/);
    const countBefore = contactsBefore.textContent;

    fireEvent.click(addBtn);

    // Count should remain the same
    expect(screen.getByText(/Contacts \(\d+\)/)).toHaveTextContent(countBefore);
  });
});
