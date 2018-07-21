import React, { Component } from 'react';

import { Container, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from '@reach/router';

import { auth, firestore } from '../firebase';
import Query from '../data/Query';

import Navigation from './Navigation';

export default class Chrome extends Component {
  render() {
    return <div className="navigation-container">
      <Navigation/>
      <div className="side-navigation-container">
        <div className="side-navigation-bar bg-light">
          <Nav vertical pills>
            <NavItem>
              <NavLink tag={Link} to="/">Membership</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/" active>Certifications</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/">Storage</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/">Access</NavLink>
            </NavItem>
          </Nav>
          <Nav vertical pills>
            <NavItem>
              <NavLink tag={Link} to="/">Members</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/">Badge Readers</NavLink>
            </NavItem>
          </Nav>
          <Nav vertical pills>
            <NavItem>
              <NavLink tag={Link} to="/">Billing</NavLink>
            </NavItem>
          </Nav>
        </div>
        <div className="main-content">
          {this.props.children}
        </div>
      </div>
    </div>;
  }
}
