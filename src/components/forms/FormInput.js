import React, { Component } from 'react';

import { Field } from 'react-final-form';
import { FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';

export default class FormInput extends Component {
  render() {
    let {type, name, label, subtext, ...props} = this.props;
    return <Field name={name} subscription={{error: true, invalid: true, value: true}} render={({input, meta}) => {
        console.log('input props are', input);
        window.theprops = input;

      return <FormGroup>
        <Label for={name}>{label}</Label>
        <Input type={type} invalid={meta.invalid} {...input} {...props}/>
        {meta.invalid && <FormFeedback>{meta.error}</FormFeedback>}
        {subtext && <FormText color="muted">{subtext}</FormText>}
      </FormGroup>
    }}/>;
  }
}
