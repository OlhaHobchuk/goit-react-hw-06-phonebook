import css from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { filterContacts } from '../../redux/contactsSlice';

export const Filter = () => {
  const filter = useSelector(state => state.contacts.filters);
  const dispatch = useDispatch();
  const filterChange = event => {
    dispatch(filterContacts(event.currentTarget.value));
  };
  return (
    <label className={css.filterTitle}>
      Find contacts by name
      <input
        className={css.filterInput}
        type="text"
        value={filter}
        onChange={filterChange}
      />
    </label>
  );
};
