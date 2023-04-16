import React, { useState } from 'react';
import css from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts } from 'redux/operations';

export function Form() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(state => state.contacts.contacts.items);
  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const name = event.target.name.value;
    const phone = event.target.elements.number.value;

    if (
      [...contacts].find(contact =>
        contact.name.includes(event.target.name.value)
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    } else {
      dispatch(addContacts({ name, phone }));
      reset();
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <div className={css.formWrapper}>
      <h1>Phonebook</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.formLable}>
          Name
          <input
            className={css.formInput}
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={css.formLable}>
          Phone number
          <input
            className={css.formInput}
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={css.formBtn} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
}
