import React, { Component } from 'react';

import { Field } from 'react-final-form';
import { FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';

import FormState from './FormState';

export default class FormInput extends Component {
  render() {
    let {type, name, label, subtext, disabled, ...props} = this.props;
    return <Field name={name} subscription={{error: true, invalid: true, value: true}} render={({input, meta}) => {
        console.log('input props are', input);
        window.theprops = input;

      return <FormState.Consumer>
        {({submitting}) => {
          return <FormGroup>
            <Label for={name}>{label}</Label>
            <Input type={type} invalid={meta.invalid} disabled={disabled || submitting} {...input} {...props}/>
            {meta.invalid && <FormFeedback>{meta.error}</FormFeedback>}
            {subtext && <FormText color="muted">{subtext}</FormText>}
          </FormGroup>;
        }}
      </FormState.Consumer>
    }}/>;
  }
}
