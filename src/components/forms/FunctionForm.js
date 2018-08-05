import React, { Component } from 'react';

import { navigate } from '@reach/router';

import { Form } from 'react-final-form';
import { Form as BootstrapForm } from 'reactstrap';
import FormState from './FormState';

export default class FunctionForm extends Component {
  onSubmit = async (values) => {
    let result = await this.props.submitTo(Object.assign(this.props.extra || {}, values));
    if (result.status === 'ok') {
      if (this.props.onSubmit) {
        await this.props.onSubmit();
      }
      if (this.props.returnTo) {
        navigate(this.props.returnTo);
      }
    } else {
      return result.errors;
    }
  }

  render() {
    let {initialValues, children} = this.props;

    return <Form
      onSubmit={this.onSubmit}
      initialValues={initialValues}
      render={({handleSubmit, pristine, reset, submitting, values}) => {
        return <FormState.Provider value={{submitting}}>
          <BootstrapForm onSubmit={handleSubmit}>
            {children}
          </BootstrapForm>
        </FormState.Provider>;
      }}
    />;
  }
}
