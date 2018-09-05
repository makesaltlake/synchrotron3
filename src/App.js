import React, { Component } from 'react';
import { Router } from '@reach/router';

import { CardDeck, Card, Button, CardBody, CardTitle, CardText, CardLink, CardImg, CardFooter } from 'reactstrap';
import CardGrid from './components/CardGrid';
import LabeledHr from './components/LabeledHr';
import PageHeader from './components/PageHeader';

import { auth, firestore, functions } from './firebase';

import Chrome from './components/Chrome';
import NewChrome from './components/NewChrome';
import LoginGuard from './components/LoginGuard';

import CertificationsList from './pages/Certifications/List';
import CertificationsAdd from './pages/Certifications/Add';
import CertificationsEdit from './pages/Certifications/Edit';
import CertificationsCertify from './pages/Certifications/Certify';

window.firestore = firestore;
window.functions = functions;

const Hi = () => <div>hi there</div>

class App extends Component {
  render() {
    return (
      <Router>
        <LoginGuard path="/">
          <NewChrome path="/">
            <Hi path="/"/>
            <CertificationsList path="/certifications"/>
            <CertificationsAdd path="/certifications/add"/>
            <CertificationsEdit path="/certifications/:certificationId/edit"/>
            <CertificationsCertify path="/certifications/:certificationId/certify"/>
          </NewChrome>
        </LoginGuard>
      </Router>
    );
  }
}

export default App;
