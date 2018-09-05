import React, { Component } from 'react';

import { Router, Link } from '@reach/router';

import classNames from 'classnames';

export default function NavLink({to, children}) {
  return <li>
    <Link to={to} getProps={({isPartiallyCurrent}) => ({className: classNames({selected: isPartiallyCurrent})})}>{children}</Link>
  </li>;
}
