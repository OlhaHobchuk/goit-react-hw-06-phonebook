import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';

import css from './ContactList.module.css';

export const ContactList = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filters);

  const dispatch = useDispatch();

  const getFilteredContacts = () => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  const filteredContact = getFilteredContacts();

  return (
    <ul className={css.contactList}>
      {filteredContact.map(({ id, name, number }) => (
        <li key={id} className={css.contactItem}>
          <p className={css.contactName}>
            {name}: {number}
          </p>
          <button
            className={css.deleteButton}
            type="button"
            onClick={() => dispatch(deleteContact({ id }))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
