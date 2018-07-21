import React, { Component } from 'react';

import { Auth, auth } from '../firebase';
import AuthState from '../data/AuthState';

export default class LoginGuard extends Component {
  render() {
    return <AuthState>
      {currentUser => {
        if (currentUser) {
          return <React.Fragment>
            {this.props.children}
          </React.Fragment>;
        } else {
          return <Auth/>;
        }
      }}
    </AuthState>
  }
}
