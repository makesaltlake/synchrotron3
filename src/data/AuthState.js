import React, { Component } from 'react';

import { auth } from '../firebase';

export default class AuthState extends Component {
  state = {
    user: auth.currentUser
  };

  componentDidMount() {
    this.unregisterListener = auth.onAuthStateChanged(user => {
      this.setState({user});
    });
    // in case the user changed between calculating the initial state and the component mounting
    this.setState(prevState => {
      if (prevState.user !== auth.currentUser) {
        return {user: auth.currentUser};
      } else {
        return null;
      }
    });
  }

  componentWillUnmount() {
    this.unregisterListener();
  }

  render() {
    if (!this.state.user && this.props.nothing) {
      return this.props.nothing;
    } else if (!this.state.user && this.props.nothing === null) {
      return null;
    } else {
      return (this.props.children || this.props.render)(this.state.user);
    }
  }
}
