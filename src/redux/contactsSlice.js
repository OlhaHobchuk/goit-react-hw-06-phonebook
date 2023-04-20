import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import shortid from 'shortid';
import storage from 'redux-persist/lib/storage';

const initialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: initialState,
    filters: '',
  },
  reducers: {
    addContact: {
      reducer(state, action) {
        state.contacts.push(action.payload);
      },
      prepare(payload) {
        return {
          payload: { ...payload, id: shortid.generate() },
        };
      },
    },
    deleteContact(state, action) {
      state.contacts = state.contacts.filter(contact => {
        return contact.id !== action.payload.id;
      });
    },
    filterContacts(state, action) {
      state.filters = action.payload;
    },
  },
});

const persistConfig = {
  key: 'root',
  storage,
};

export const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { addContact, deleteContact, filterContacts } =
  contactsSlice.actions;
