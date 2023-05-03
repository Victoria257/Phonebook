import ContactList from 'components/ContactList/ContactList';
import FilterContacts from 'components/FilterContacts/FilterContacts';
import { Form } from 'components/Form/Form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import css from './PageContacts.module.css';

const Contacts = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    isLoggedIn && dispatch(fetchContacts());
  }, [isLoggedIn, dispatch]);

  // const isLoading = state => state.contacts.isLoading;
  // const error = state => state.contacts.error;
  return (
    <div className={css.container}>
      <Form />
      <ContactList>
        <FilterContacts />
        {/* {isLoading && !error && <b>Request in progress...</b>} */}
      </ContactList>
    </div>
  );
};

export default Contacts;
