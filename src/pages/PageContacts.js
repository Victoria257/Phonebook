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


  return (
    <div className={css.container}>
      <Form />
      <ContactList>
        <FilterContacts />
  
      </ContactList>
    </div>
  );
};

export default Contacts;
