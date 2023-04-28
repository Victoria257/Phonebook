import ContactList from 'components/ContactList/ContactList';
import FilterContacts from 'components/FilterContacts/FilterContacts';
import { Form } from 'components/Form/Form';
import { useDispatch } from 'react-redux';
import { fetchContacts } from 'redux/operations';

export const Contacts = () => {
  const dispatch = useDispatch();
  dispatch(fetchContacts());
  // const isLoading = state => state.contacts.isLoading;
  // const error = state => state.contacts.error;
  return (
    <div>
      <Form />
      <ContactList>
        <FilterContacts />
        {/* {isLoading && !error && <b>Request in progress...</b>} */}
      </ContactList>
    </div>
  );
};
