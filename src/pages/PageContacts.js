import ContactList from 'components/ContactList/ContactList';
import FilterContacts from 'components/FilterContacts/FilterContacts';
import { Form } from 'components/Form/Form';

export const Contacts = () => {
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
