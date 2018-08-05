import React, { Component } from 'react';

import { FormGroup, Button } from 'reactstrap';

import FormState from './FormState';

export default function FormButton({submittingLabel, disabled, children, ...props}) {
  return <FormState.Consumer>
    {({submitting}) => {
      return <FormGroup>
        <Button disabled={disabled || submitting} {...props}>{submitting && submittingLabel ? submittingLabel : children}</Button>
      </FormGroup>;
    }}
  </FormState.Consumer>;
}
