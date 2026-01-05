import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';
import '../styles/ContactManager.css';

export const ContactManager = ({ isOpen, onClose }) => {
  const { contacts, addContact, deleteContact, createNewConversation } = useChat();
  const [newContactName, setNewContactName] = useState('');

  const handleAddContact = (e) => {
    e.preventDefault();
    if (newContactName.trim()) {
      addContact(newContactName);
      setNewContactName('');
    }
  };

  const handleStartChat = (contactId) => {
    createNewConversation(contactId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} data-testid="contact-modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Manage Contacts</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <form className="add-contact-form" onSubmit={handleAddContact}>
            <input
              type="text"
              placeholder="Enter contact name..."
              value={newContactName}
              onChange={(e) => setNewContactName(e.target.value)}
              data-testid="new-contact-input"
            />
            <button type="submit" data-testid="add-contact-btn">Add Contact</button>
          </form>

          <div className="contacts-list">
            <h3>Contacts ({contacts.length})</h3>
            {contacts.map((contact) => (
              <div key={contact.id} className="contact-item" data-testid={`contact-item-${contact.id}`}>
                <div className="contact-info">
                  <span className="contact-avatar">{contact.avatar}</span>
                  <div className="contact-details">
                    <p className="contact-name">{contact.name}</p>
                    <p className="contact-status">{contact.status}</p>
                  </div>
                </div>
                <div className="contact-actions">
                  <button
                    className="chat-btn"
                    onClick={() => handleStartChat(contact.id)}
                    data-testid={`chat-btn-${contact.id}`}
                  >
                    Chat
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteContact(contact.id)}
                    data-testid={`delete-btn-${contact.id}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
