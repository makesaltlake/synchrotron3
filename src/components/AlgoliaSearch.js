import React, { Component } from 'react';

import { InstantSearch } from 'react-instantsearch/dom';

import RunFunction from '../data/RunFunction';

import * as functions from '../functions';

export default function AlgoliaSearch({indexName, children}) {
  return <RunFunction function={functions.search[indexName].get_token} loading='Loading...' render={({appId, apiKey, indexName: searchIndexName}) => {
    return <InstantSearch appId={appId} apiKey={apiKey} indexName={searchIndexName}>
      {children}
    </InstantSearch>
  }}/>
}
