import React, { Component } from 'react';

import { storage } from '../../firebase';

import { Form } from 'react-final-form';
import FormInput from '../../components/forms/FormInput';
import FormButton from '../../components/forms/FormButton';
import FileUploadInput from '../../components/forms/FileUploadInput';
import FunctionForm from '../../components/forms/FunctionForm';

import { Form as BootstrapForm, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';

export default class CertificationForm extends Component {
  render() {
    return <FunctionForm {...this.props}>
      <FormInput type="text" name="name" label="Name"/>
      <FileUploadInput name="image" label="Image" uploadTo={storage.ref('images')}/>
      <FormButton color='primary' type='submit' submittingLabel="Saving...">Save</FormButton>
    </FunctionForm>;
  }
}
