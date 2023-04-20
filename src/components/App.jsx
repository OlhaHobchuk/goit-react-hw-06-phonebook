import { useSelector } from 'react-redux';
import { selectContacts } from '../redux/selectors';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Notification } from './Notification/Notification';

export const App = () => {
  const contacts = useSelector(selectContacts);

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
      <ContactForm />
      <h2>Contacts</h2>

      {contacts.length ? (
        <>
          <Filter />
          <ContactList />
        </>
      ) : (
        <Notification message="There is no contacts" />
      )}
    </div>
  );
};
