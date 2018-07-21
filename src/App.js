import React, { Component } from 'react';
import { Router } from '@reach/router';

import { CardDeck, Card, Button, CardBody, CardTitle, CardText, CardLink, CardImg, CardFooter } from 'reactstrap';
import CardGrid from './components/CardGrid';
import LabeledHr from './components/LabeledHr';
import PageHeader from './components/PageHeader';

import { auth, firestore } from './firebase';

import Chrome from './components/Chrome';
import LoginGuard from './components/LoginGuard';

import Certifications from './pages/Certifications';

window.firestore = firestore;

const Hi = () => <div>hi</div>

class App extends Component {
  render() {
    return (
      <Router>
        <LoginGuard path="/">
          <Chrome path="/">
            <Hi path="/"/>
            <Certifications path="/certifications"/>
          </Chrome>
        </LoginGuard>
      </Router>
    );
  }
}

export default App;
