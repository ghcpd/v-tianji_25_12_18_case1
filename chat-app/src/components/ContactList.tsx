import React, { useState } from 'react';
import { useChat } from '../ChatContext';
import { Contact } from '../types';

const ContactList: React.FC = () => {
  const { contacts, addContact, removeContact } = useChat();
  const [newName, setNewName] = useState('');

  const handleAdd = () => {
    if (newName.trim()) {
      const newContact: Contact = {
        id: Date.now().toString(),
        name: newName,
        avatar: newName[0].toUpperCase(),
      };
      addContact(newContact);
      setNewName('');
    }
  };

  return (
    <div style={{ width: '20%', borderLeft: '1px solid #ccc', padding: '10px' }}>
      <h3>Contacts</h3>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Add contact name"
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <button onClick={handleAdd} style={{ padding: '8px' }}>Add</button>
      <ul>
        {contacts.map((contact: Contact) => (
          <li key={contact.id} style={{ marginBottom: '5px' }}>
            {contact.name} <button onClick={() => removeContact(contact.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;