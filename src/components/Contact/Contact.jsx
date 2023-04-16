import css from 'components/Contact/Contact.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { delContact } from 'redux/operations';

export const Contact = () => {
  const contacts = useSelector(state => state.contacts.contacts.items);
  const filterContact = useSelector(state => state.filterContact.filters);

  const dispatch = useDispatch();

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterContact.toLowerCase())
    );
  };

  const visibleContacts = getVisibleContacts();

  return visibleContacts.map(({ name, phone, id }) => (
    <li className={css.contact} key={id}>
      <p className={css.spans}>
        <span>{name}</span> <span>{phone}</span>
      </p>

      <button
        className={css.delButton}
        type="button"
        onClick={() => dispatch(delContact(id))}
      >
        delete
      </button>
    </li>
  ));
};
