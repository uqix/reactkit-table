import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink } from 'react-router-dom';

const activeClassName='Mui-selected';

const Link = React.forwardRef((props, ref) => (
  <NavLink
    innerRef={ref}
    activeClassName={activeClassName}
    {...props}
  />
));

export default function Menu() {
  return (
    <List>
      <ListItem button component={Link} to='/'>
        <ListItemText primary='Basic' />
      </ListItem>
    </List>
  );
}
