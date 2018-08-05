import React, { Component } from 'react';

import { SearchBox, Hits } from 'react-instantsearch/dom';

import FunctionForm from '../../components/forms/FunctionForm';
import FormButton from '../../components/forms/FormButton';
import AlgoliaSearch from '../../components/AlgoliaSearch';

import * as functions from '../../functions';

export default class Certify extends React.Component {
  render() {
    return <FunctionForm submitTo={functions.certifications.certify} returnTo='/certifications'>
      <AlgoliaSearch indexName='users_restricted'>
        <SearchBox/>
        <Hits/>
      </AlgoliaSearch>
      <FormButton color='primary' type='submit' submittingLabel="Certifying...">Certify</FormButton>
    </FunctionForm>;
  }
}
