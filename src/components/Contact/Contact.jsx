import { useDispatch, useSelector } from 'react-redux';
import { delContact } from 'redux/operations';
import * as React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
import PhoneEnabledRoundedIcon from '@mui/icons-material/PhoneEnabledRounded';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import css from './Contact.module.css';

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

  const styles = {
    iconButton: {
      transition: 'background-color 0.3s',
      '&:hover': {
        backgroundColor: 'rgb(32, 220, 220)',
      },
    },
  };

  return visibleContacts.map(({ name, number, id }) => (
    <li className={css.contact} key={id}>
      <List
        className={css.list}
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
        }}
      >
        <ListItem alignItems="center">
          <IconButton
            color="primary"
            sx={styles.iconButton}
            aria-label={`Call by number ${number}`}
            type="phone"
            href={`tel: ${number}`}
          >
            <PhoneEnabledRoundedIcon />
          </IconButton>

          <ListItemText
            primary={name}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {number}
                </Typography>
              </React.Fragment>
            }
          />
          <IconButton
            aria-label="delete"
            onClick={() => dispatch(delContact(id))}
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>

        <Divider variant="inset" component="li" />
      </List>
    </li>

    //without material
    //
    //   <ul className={css.list}>
    //     <li>{name}</li>
    //     <li>
    //       <a href={number} target="_blank" rel="noreferrer">
    //         {number}
    //       </a>
    //     </li>
    //   </ul>

    //   <button
    //     className={css.delButton}
    //     type="button"
    //     onClick={() => dispatch(delContact(id))}
    //   >
    //     delete
    //   </button>
  ));
};
