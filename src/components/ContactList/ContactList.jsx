import { Contact } from 'components/Contact/Contact';
import css from './ContactList.module.css';

const ContactList = ({ children }) => {
  return (
    <div className={css.container}>
      <h2 className={css.title}>Contacts</h2>
      {children}
      <ul className={css.contactsList}>
        <Contact />
      </ul>
    </div>
  );
};

export default ContactList;
