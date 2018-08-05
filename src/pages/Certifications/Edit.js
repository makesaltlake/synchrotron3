import React, { Component } from 'react';

import { firestore } from '../../firebase';
import * as functions from '../../functions';

import AuthState from '../../data/AuthState';
import Query from '../../data/Query';

import Form from './Form';
import Page from '../../components/Page';
import Breadcrumb from '../../components/Breadcrumb';

class Edit extends Component {
  render() {
    return <Page form>
      <Breadcrumb to="/certifications">Certifications</Breadcrumb>
      <Breadcrumb>{this.props.certification.get('name')}</Breadcrumb>
      <Breadcrumb>Edit</Breadcrumb>
      <Form submitTo={functions.certifications.update} initialValues={this.props.certification.data()} returnTo='/certifications' extra={{id: this.props.certification.id}}/>
    </Page>;
  }
}

export default function WrappedEdit({navigate, certificationId}) {
  return (<AuthState nothing={null} render={user =>
    <Query doc={`users/${user.uid}`} render={userDoc =>
      <Query doc={`certifications/${certificationId}`} loading={null} nothing={"That certification does not exist."} render={certification =>
        <Edit certification={certification}/>
      }/>
    }/>
  }/>);
}
