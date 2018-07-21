import React, { Component } from 'react';

import { Link } from '@reach/router';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from 'reactstrap';

import { auth } from '../firebase';

export default class Navigation extends Component {
  state = {
    open: false
  };

  toggle = () => {
    this.setState(({open}) => ({open: !open}));
  }

  logOut = () => {
    auth.signOut();
  }

  render() {
    return <Navbar light expand="sm" className="top-navigation-bar">
      <NavbarBrand tag={Link} to="/">Make Salt Lake</NavbarBrand>
      <NavbarToggler onClick={this.toggle}/>
      <Collapse isOpen={this.state.open} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem className="navbar-text navbar-name">
            Alex Boyd
          </NavItem>
          <NavItem>
            <Button outline color='secondary' onClick={this.logOut}>Log out</Button>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>;
  }
}
