import React, { Component } from 'react';

import { Link } from '@reach/router';

import { firestore, storage } from '../../firebase';

import { Card, CardBody, CardTitle, CardImg, CardFooter, Button } from 'reactstrap';
import FlexCardFooter from '../../components/FlexCardFooter';

import CardGrid from '../../components/CardGrid';
import LabeledHr from '../../components/LabeledHr';
import Page from '../../components/Page';
import Breadcrumb from '../../components/Breadcrumb';
import BreadcrumbButton from '../../components/BreadcrumbButton';
import AspectRatioCardImage from '../../components/AspectRatioCardImage';

import AuthState from '../../data/AuthState';
import Query from '../../data/Query';
import DownloadFile from '../../data/DownloadFile';

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
    let signUp = null;
    let runCertification = null;
    let recipients = null;
    let instructors = null;
    let edit = null;
    let deleteButton = null;

    if (certification.get('image')) {
      image = <DownloadFile file={storage.ref('images').child(certification.get('image'))} loading={null} render={url => <AspectRatioCardImage src={url}/>}/>
    }

    if (this.props.user.get(`instructs_certifications.${certification.id}`)) {
      runCertification = <Button color='primary' tag={Link} to={`${certification.id}/run`}>Run Certification</Button>;
      recipients = <Link to={`${certification.id}/recipients`}>Recipients</Link>;
    }

    if (this.props.user.get('site_admin') || this.props.user.get('shop_admin')) {
      instructors = <Link to={`${certification.id}/instructors`}>Instructors</Link>;
      edit = <Button outline color='primary' tag={Link} to={`${certification.id}/edit`}>Edit</Button>
      deleteButton = <Button outline color='danger' tag={Link} to={`${certification.id}/delete`}>Delete</Button>
    }

    signUp = <a href='#'>Sign up</a>;

    return <Card key={certification.id}>
      {image}
      <CardBody>
        <CardTitle>{certification.get('name')}</CardTitle>
      </CardBody>
      <FlexCardFooter>
        {runCertification}
        {recipients}
        {instructors}
        {edit}
        {deleteButton}
        {signUp}
      </FlexCardFooter>
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
      return <Page>
        <Breadcrumb>Certifications</Breadcrumb>
        <BreadcrumbButton color="primary" tag={Link} to="/certifications/add">Add</BreadcrumbButton>
        {ownedCertificationsDiv}
        {passedCertificationsDiv}
        {otherCertificationsDiv}
      </Page>;
    } else {
      return <Page title="Certifications">
        <div className="text-muted">No certifications.</div>
      </Page>;
    }
  }
}

export default function WrappedCertifications(props) {
  return <AuthState nothing={null}>
    {user => <Query query={firestore.collection('users').doc(user.uid)}>
      {userDoc => <Query query={firestore.collection('certifications').orderBy('name', 'asc')} loading={null}>
        {(certifications => <Certifications certifications={certifications} user={userDoc} {...props}/>)}
      </Query>}
    </Query>}
  </AuthState>;
}
