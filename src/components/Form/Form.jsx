import React, { useState } from 'react';
import css from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts } from 'redux/operations';
import { toast } from 'react-hot-toast';

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

    const nameNew = event.target.name.value;
    const numberNew = event.target.elements.number.value;

    if (
      [...contacts].find(contact =>
        contact.name.includes(event.target.name.value)
      )
    ) {
      toast.error(`${name} is already in contacts`);
      return;
    } else {
      dispatch(addContacts({ name: nameNew, number: numberNew }));
      reset();
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <div className={css.formWrapper}>
      <h2 className={css.formTitle}>Phonebook</h2>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.formLable}>
          Name
          <input
            className={css.formInput}
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Viktoriia"
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
            placeholder="+380731122333"
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
