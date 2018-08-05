import React, { Component } from 'react';

import { firestore } from '../firebase';

export default class AuthState extends Component {
  state = {
    snapshot: null,
    loading: true
  };

  query(props) {
    props = props || this.props;

    if (props.query) {
      return props.query;
    } else if (props.doc) {
      return firestore.doc(props.doc);
    }
  }

  componentDidMount() {
    if (this.query()) {
      this.unregisterListener = this.query().onSnapshot(this.onSnapshot);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let oldQuery = this.query(prevProps), newQuery = this.query();
    if ((oldQuery && !newQuery) ||
        (newQuery && !oldQuery) ||
        (!oldQuery.isEqual(newQuery))) {
      if (this.unregisterListener) {
        this.unregisterListener();
        this.unregisterListener = null;
      }

      if (newQuery) {
        this.setState({snapshot: null, loading: true});
        this.unregisterListener = newQuery.onSnapshot(this.onSnapshot);
      } else {
        this.setState({snapshot: null});
      }
    }
  }

  onSnapshot = snapshot => {
    this.setState({
      snapshot,
      loading: false
    });
  }

  componentWillUnmount() {
    if (this.unregisterListener) {
      this.unregisterListener();
    }
  }

  isNothing() {
    return (
      this.state.snapshot === null || // no snapshot (probably because props.query is set to null)
      this.state.snapshot.docs && this.state.snapshot.size === 0 || // collection snapshot with no docs
      !this.state.snapshot.docs && this.state.snapshot.data() === undefined // document snapshot that didn't match anything
    );
  }

  render() {
    if (this.state.loading && this.props.loading) {
      return this.props.loading;
    } else if (this.state.loading && this.props.loading == null) {
      return null;
    } else if (this.isNothing() && this.props.nothing) {
      return this.props.nothing;
    } else if (this.isNothing() && this.props.nothing === null) {
      return null;
    } else {
      return (this.props.children || this.props.render)(this.state.snapshot, this.state.loading);
    }
  }
}
