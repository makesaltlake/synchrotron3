import React, { Component } from 'react';

import { firestore } from '../../firebase';
import * as functions from '../../functions';

import AuthState from '../../data/AuthState';
import Query from '../../data/Query';

import Form from './Form';
import Page from '../../components/Page';
import Breadcrumb from '../../components/Breadcrumb';

class Edit extends Component {
  onSubmit = async (values) => {
    let result = await functions.certifications.update(Object.assign({id: this.props.certification.id}, values));
    if (result.status === 'ok') {
      this.props.navigate('../..');
    } else {
      return result.errors;
    }
  }

  render() {
    return <Page form>
      <Breadcrumb to="/certifications">Certifications</Breadcrumb>
      <Breadcrumb>{this.props.certification.get('name')}</Breadcrumb>
      <Breadcrumb>Edit</Breadcrumb>
      <Form initialValues={this.props.certification.data()} onSubmit={this.onSubmit}/>
    </Page>;
  }
}

export default function WrappedEdit({navigate, certificationId}) {
  return (<AuthState nothing={null} render={user =>
    <Query query={firestore.collection('users').doc(user.uid)} render={userDoc =>
      <Query query={firestore.collection('certifications').doc(certificationId)} loading={null} nothing={"That certification does not exist."} render={certification =>
        <Edit navigate={navigate} certification={certification}/>
      }/>
    }/>
  }/>);
}
