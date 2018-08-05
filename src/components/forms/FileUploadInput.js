import React, { Component } from 'react';

import { storage } from '../../firebase';
import { DateTime } from 'luxon';
import uuid from 'uuid/v4';

import { Field } from 'react-final-form';
import { FormGroup, Label, Input, FormFeedback, FormText, Button } from 'reactstrap';

import DownloadFile from '../../data/DownloadFile';

export default class FileUploadInput extends Component {
  state = {
    uploading: false
  }

  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
  }

  fileInputChanged = async (event) => {
    let file = event.target.files[0];
    this.setState({uploading: true});

    let filename = `${DateTime.local().toISO()}-${uuid()}-${file.name}`;
    let ref = this.props.uploadTo.child(filename);
    await ref.put(file);

    this.setState({uploading: false});
    this.onChange(filename);
  }

  uploadButtonClicked = (event) => {
    event.preventDefault();
    this.fileInputRef.current.click();
  }

  changeButtonClicked = (event) => {
    event.preventDefault();
    this.fileInputRef.current.click();
  }

  render() {
    return <React.Fragment>
      <input type="file" name={this.props.name} ref={this.fileInputRef} style={{display: 'none'}} onChange={this.fileInputChanged}/>
      <Field
        type="text"
        name={this.props.name}
        placeholder="Image URL"
        parse={null}
        uploading={this.state.uploading}
        subscription={{error: true, invalid: true, value: true}}
      >
        {({input: {value, onChange}, meta, uploading}) => {
          this.onChange = onChange;

          let content;
          if (uploading) {
            content = <div>Uploading...</div>;
          } else if (value) {
            content = <React.Fragment>
              <DownloadFile file={this.props.uploadTo.child(value)} loading={'Loading...'} render={url => <img className="file-upload-input-preview" src={url}/>}/>
              <Button onClick={this.changeButtonClicked}>Change</Button>
            </React.Fragment>;
          } else {
            content = <Button color='secondary' onClick={this.uploadButtonClicked}>Upload</Button>
          }

          return <FormGroup>
            <Label for={this.props.name}>{this.props.label}</Label>
            {content}
            {meta.invalid && <FormFeedback>{meta.error}</FormFeedback>}
            {this.props.subtext && <FormText color="muted">{this.props.subtext}</FormText>}
          </FormGroup>;
        }}
      </Field>
    </React.Fragment>;
  }
}
