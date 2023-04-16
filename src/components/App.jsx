import { Form } from 'components/Form/Form';
import ContactList from 'components/ContactList/ContactList';
import FilterContacts from './FilterContacts/FilterContacts';
import { useDispatch } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

function App() {
  const dispatch = useDispatch();
  // const isLoading = state => state.contacts.isLoading;
  // const error = state => state.contacts.error;

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <div>
        <Toaster position="top-right" reverseOrder={true} />
      </div>
      <Form />
      <ContactList>
        <FilterContacts />
        {/* {isLoading && !error && <b>Request in progress...</b>} */}
      </ContactList>
    </div>
  );
}

export default App;
