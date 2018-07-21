import React, { Component } from 'react';

import { firestore } from '../../firebase';

import { Card, CardBody, CardTitle, CardImg } from 'reactstrap';

import CardGrid from '../../components/CardGrid';
import LabeledHr from '../../components/LabeledHr';
import PageHeader from '../../components/PageHeader';

import AuthState from '../../data/AuthState';
import Query from '../../data/Query';

class Certifications extends Component {
  renderCertifications(certifications, title) {
    return <React.Fragment>
      <LabeledHr short>{title}</LabeledHr>
      <CardGrid>
        {certifications.map(certification => this.renderCertification(certification))}
      </CardGrid>
    </React.Fragment>;
  }

  renderCertification(certification) {
    let image = null;
    if (certification.get('image')) {
      image = <CardImg top width="100%" src={certification.get('image')}/>
    }

    return <Card key={certification.id}>
      {image}
      <CardBody>
        <CardTitle>{certification.get('name')}</CardTitle>
      </CardBody>
    </Card>;
  }

  render() {
    let ownedCertifications = [];
    let passedCertifications = [];
    let otherCertifications = [];
    this.props.certifications.docs.forEach(certification => {
      if (this.props.user.get(`instructs_certifications.${certification.id}`)) {
        ownedCertifications.push(certification);
      } else if (this.props.user.get(`passed_certifications.${certification.id}`)) {
        passedCertifications.push(certification);
      } else {
        otherCertifications.push(certification);
      }
    });

    let ownedCertificationsDiv = ownedCertifications.length > 0 ? this.renderCertifications(ownedCertifications, 'Taught by me') : null;
    let passedCertificationsDiv = passedCertifications.length > 0 ? this.renderCertifications(passedCertifications, 'Passed') : null;
    let otherCertificationsDiv = otherCertifications.length > 0 ? this.renderCertifications(otherCertifications, 'Available') : null;

    if (ownedCertificationsDiv || passedCertificationsDiv || otherCertificationsDiv) {
      return <div>
        <PageHeader>Certifications</PageHeader>
        {ownedCertificationsDiv}
        {passedCertificationsDiv}
        {otherCertificationsDiv}
      </div>;
    } else {
      return <div>
        <PageHeader>Certifications</PageHeader>
        <div className="text-muted">No certifications.</div>
      </div>;
    }
  }
}

export default function WrappedCertifications(props) {
  return <AuthState nothing={null}>
    {user => <Query query={firestore.collection('users').doc(user.uid)}>
      {userDoc => <Query query={firestore.collection('certifications')} loading={null}>
        {(certifications => <Certifications certifications={certifications} user={userDoc} {...props}/>)}
      </Query>}
    </Query>}
  </AuthState>;
}
