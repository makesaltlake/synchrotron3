import React, { Component } from 'react';

import NavLink from './NavLink';

import './NewChrome.css';

export default class NewChrome extends Component {
  render() {
    return <div class='chrome'>
      <div class='chrome-bar'>
        <div class='chrome-brand'>
          Make Salt Lake
        </div>
        <ul>
          <NavLink to='/certifications'>Certifications</NavLink>
          <NavLink to='/storage'>Storage</NavLink>
          <NavLink to='/access'>Access</NavLink>
        </ul>
        <ul>
          <NavLink to='/admin/members'>Members</NavLink>
          <NavLink to='/admin/badge_readers'>Badge Readers</NavLink>
        </ul>
        <ul>
          <NavLink to='/profile'>Profile</NavLink>
          <NavLink to='/membership'>Membership</NavLink>
          <NavLink to='/billing'>Billing</NavLink>
        </ul>
      </div>
      <div class='chrome-content'>
        {this.props.children}
      </div>
    </div>;
  }
}
