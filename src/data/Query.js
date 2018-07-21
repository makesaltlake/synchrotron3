import React, { Component } from 'react';

export default class AuthState extends Component {
  state = {
    snapshot: null,
    loading: true
  };

  componentDidMount() {
    if (this.props.query) {
      this.unregisterListener = this.props.query.onSnapshot(this.onSnapshot);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let oldQuery = prevProps.query, newQuery = this.props.query;
    if ((oldQuery && !newQuery) ||
        (newQuery && !oldQuery) ||
        (!oldQuery.isEqual(newQuery))) {
      if (this.unregisterListener) {
        this.unregisterListener();
        this.unregisterListener = null;
      }

      if (this.props.query) {
        this.setState({snapshot: null, loading: true});
        this.unregisterListener = this.props.query.onSnapshot(this.onSnapshot);
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
