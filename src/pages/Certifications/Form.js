import React, { Component } from 'react';

import { Form } from 'react-final-form';
import FormInput from '../../components/forms/FormInput';

import { Form as BootstrapForm, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';

export default class CertificationForm extends Component {
  render() {
    console.log("initial values:", this.props.initialValues);
    return <Form
      onSubmit={this.props.onSubmit}
      initialValues={this.props.initialValues}
      render={({handleSubmit, pristine, reset, submitting, values}) => {
        return <BootstrapForm onSubmit={handleSubmit}>
          <FormInput type="text" name="name" label="Name"/>
          <FormGroup>
            <Button color='primary' type='submit'>Save</Button>
          </FormGroup>
        </BootstrapForm>;
      }}
    />;
  }
}
