import { Contact } from 'components/Contact/Contact';
import css from './ContactList.module.css';

const ContactList = ({ children }) => {
  return (
    <div>
      <h2>Contacts</h2>
      {children}
      <ul className={css.contactsList}>
        <Contact />
      </ul>
    </div>
  );
};

export default ContactList;
