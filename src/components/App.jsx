import React, { useState, useEffect } from 'react';
import shortid from 'shortid';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Notification } from './Notification/Notification';

const initialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) || initialState
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const isOnContacts = contacts.find(item => {
      return item.name.toLowerCase() === name.toLowerCase();
    });

    if (isOnContacts) {
      return alert(`${name} is already in contacts`);
    }
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    setContacts(prevState => [contact, ...prevState]);
  };

  const filterChange = event => {
    setFilter(event.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  const filteredContact = getFilteredContacts();

  return (
    <div
      style={{
        padding: '20px',
        width: '500px',
        borderStyle: 'solid',
        borderColor: 'grey',
        borderWidth: '2px',
        borderRadius: '10px',
      }}
    >
      <h1 style={{ marginTop: 0 }}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>

      {contacts.length ? (
        <>
          <Filter onFilterChange={filterChange} />
          <ContactList
            contacts={filteredContact}
            onDeleteContact={deleteContact}
          />
        </>
      ) : (
        <Notification message="There is no contacts" />
      )}
    </div>
  );
};
