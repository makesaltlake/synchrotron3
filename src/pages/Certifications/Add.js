import React, { Component } from 'react';

import { firestore } from '../../firebase';
import * as functions from '../../functions';

import AuthState from '../../data/AuthState';
import Query from '../../data/Query';

import Form from './Form';
import Page from '../../components/Page';
import Breadcrumb from '../../components/Breadcrumb';

export default class Add extends Component {
  onSubmit = async (values) => {
    let result = await functions.certifications.create(values);
    if (result.status === 'ok') {
      this.props.navigate('..');
    } else {
      return result.errors;
    }
  }

  render() {
    return <Page form>
      <Breadcrumb to="/certifications">Certifications</Breadcrumb>
      <Breadcrumb>Add</Breadcrumb>
      <Form onSubmit={this.onSubmit}/>
    </Page>;
  }
}
