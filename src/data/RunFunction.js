import React, { Component } from 'react';

export default class RunFunction extends Component {
  state = {
    result: undefined,
  };

  componentDidMount() {
    this.run();
  }

  componentDidUpdate(prevProps) {
    // TODO: support functions that take more than one argument
    if (prevProps.function !== this.props.function || JSON.stringify(prevProps.value) !== JSON.stringify(this.props.value)) {
      this.run();
    }
  }

  async run() {
    let func = this.props.function;
    let value = this.props.value;

    if (func) {
      let result;
      if (value === undefined) {
        result = await func();
      } else {
        result = await func(value);
      }
      this.setState((prevState, props) => {
        // make sure we're still dealing with the same function and args before setting the result
        if (props.function === func && JSON.stringify(props.value) === JSON.stringify(value)) {
          return {result};
        } else {
          return null;
        }
      });
    } else {
      this.setState({result: undefined});
    }
  }

  render() {
    if (this.state.result === undefined && this.props.function && this.props.loading) {
      return this.props.loading;
    } else if (this.state.result === undefined && this.props.function && this.props.loading === null) {
      return null;
    } else {
      return (this.props.render || this.props.children)(this.state.result);
    }
  }
}
