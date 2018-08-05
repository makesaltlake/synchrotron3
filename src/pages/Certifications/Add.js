import React, { Component } from 'react';

import { firestore } from '../../firebase';
import * as functions from '../../functions';

import AuthState from '../../data/AuthState';
import Query from '../../data/Query';

import Form from './Form';
import Page from '../../components/Page';
import Breadcrumb from '../../components/Breadcrumb';

export default class Add extends Component {
  render() {
    return <Page form>
      <Breadcrumb to="/certifications">Certifications</Breadcrumb>
      <Breadcrumb>Add</Breadcrumb>
      <Form submitTo={functions.certifications.create} returnTo='/certifications'/>
    </Page>;
  }
}
