import css from 'components/Contact/Contact.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { delContact } from 'redux/operations';

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

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

  return visibleContacts.map(({ name, number, id }) => (
    <li className={css.contact} key={id}>
      <List
        className={css.list}
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
        }}
      >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={name} src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
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
            edge="end"
            aria-label="delete"
            onClick={() => dispatch(delContact(id))}
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>

        <Divider variant="inset" component="li" />
      </List>
    </li>

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
