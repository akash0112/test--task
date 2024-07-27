import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Button, styled } from '@mui/material';

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  margin: theme.spacing(0, 1),
  '&.active': {
    fontWeight: 'bold',
    color: "white"
  },
}));

const NavBar = () => (
  <AppBar position="static">
    <Toolbar>
      <StyledNavLink to="/events">
        <Button color="inherit">Events List</Button>
      </StyledNavLink>
      <StyledNavLink to="/add-event">
        <Button color="inherit">Add Event</Button>
      </StyledNavLink>
    </Toolbar>
  </AppBar>
);

export default NavBar;
