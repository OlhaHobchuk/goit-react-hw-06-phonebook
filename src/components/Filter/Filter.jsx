import css from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilters } from '../../redux/selectors';
import { filterContacts } from '../../redux/contactsSlice';

export const Filter = () => {
  const filter = useSelector(selectFilters);
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
