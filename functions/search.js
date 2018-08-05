const { firestore, functions } = require('./firebase');
const util = require('./util');
const { algolia, appId: algoliaAppId, searchKey } = require('./algolia');

const REINDEX_BATCH_SIZE = 50;

function search(spec) {
  const { collection, index, canAccess, transform, validity, filters } = spec;
  const algoliaIndex = algolia.initIndex(index);

  return {
    watch: functions.firestore.document(`${collection}/{id}`).onWrite((change, context) => {
      if (change.after.exists) {
        console.log('[search] indexing document', context.params.id, 'in index', index);
        return Promise.resolve(change.after.data()).then(data => {
          if (transform) {
            return transform(data);
          } else {
            return data;
          }
        }).then(data => {
          return algoliaIndex.addObject(Object.assign({}, data, {objectID: context.params.id}));
        })
      } else {
        console.log('[search] deleting document ', context.params.id, 'from index', index);
        return algoliaIndex.deleteObject(context.params.id);
      }
    }),
    get_token: util.authenticatedFunction((data, context, {user}) => {
      return canAccess({user});
    }, (data, context) => {
      let params = {
        restrictIndices: index,
        validUntil: validity || (Math.floor(Date.now() / 1000) + 86400)
      };
      if (filters) {
        params.filters = filters;
      }
      let apiKey = algolia.generateSecuredApiKey(searchKey, params);
      return {
        appId: algoliaAppId,
        apiKey: apiKey,
        indexName: index
      };
    }),
    reindex: util.authenticatedFunction((data, context, {user}) => {
      return user.get('site_admin');
    }, (data, context) => {
      console.log('[search] reindexing index', index);
      return reindex(collection, null, algoliaIndex, transform).then(() => {
        console.log('[search] finished reindexing index', index);
        return null;
      });
    })
  }
}

function reindex(collection, startAfter, algoliaIndex, transform) {
  let query = firestore.collection(collection).limit(REINDEX_BATCH_SIZE);
  if (startAfter) {
    query = query.startAfter(startAfter);
  }
  return query.get().then(snapshot => {
    if (snapshot.docs.length === 0) {
      return null;
    }

    console.log('[search] reindexing', snapshot.docs.length, 'documents');

    let objects = snapshot.docs.map(doc => {
      let data = doc.data();
      if (transform) {
        data = transform(data);
      }
      return Object.assign({}, data, {objectID: doc.id});
    });
    return algoliaIndex.addObjects(objects).then(() => {
      return reindex(collection, snapshot.docs[snapshot.docs.length - 1], algoliaIndex, transform);
    });
  });
}

exports.users = search({
  collection: 'users',
  index: 'users',
  canAccess: function({user}) {
    return user.get('site_admin');
  }
});

exports.users_restricted = search({
  collection: 'users',
  index: 'users_restricted',
  transform: function(data) {
    return {
      name: data.name
    };
  },
  canAccess: function({user}) {
    return user.get('instructs_certifications') && Object.keys(user.get('instructs_certifications')).length > 0;
  }
});
