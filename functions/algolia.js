const { functions } = require('./firebase');
const algoliasearch = require('algoliasearch');

exports.algolia = algoliasearch(
  functions.config().algolia.app_id,
  functions.config().algolia.api_key
);

exports.appId = functions.config().algolia.app_id;
exports.searchKey = functions.config().algolia.search_key;
