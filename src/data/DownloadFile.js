import React, { Component } from 'react';

export default class DownloadFile extends Component {
  state = {
    url: null,
  };

  componentDidMount() {
    this.download();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.file !== this.props.file) {
      this.download();
    }
  }

  async download() {
    let file = this.props.file;

    if (file) {
      let url = await file.getDownloadURL();
      this.setState((prevState, props) => {
        // make sure this is still the image we want before setting the URL
        if (props.file === file) {
          return {url};
        } else {
          return null;
        }
      });
    } else {
      this.setState({url: null});
    }
  }

  render() {
    if (!this.state.url && this.props.file && this.props.loading) {
      return this.props.loading;
    } else if (!this.state.url && this.props.file && this.props.loading === null) {
      return null;
    } else {
      return (this.props.render || this.props.children)(this.state.url);
    }
  }
}
