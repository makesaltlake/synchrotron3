const { firestore, functions } = require('./firebase');

function permissionDenied() {
  return new functions.https.HttpsError('permission-denied');
}
exports.permissionDenied = permissionDenied;

exports.authenticatedFunction = function(checker, action) {
  if (action === null && checker !== null) {
    action = checker;
    checker = null;
  }

  if (!checker) {
    checker = () => true;
  }

  return functions.https.onCall((data, context) => {
    if (!context.auth) {
      return Promise.reject(permissionDenied());
    }

    return firestore.collection('users').doc(context.auth.uid).get().then(userDoc => {
      if (!userDoc.exists) {
        return Promise.reject(permissionDenied());
      }

      return Promise.resolve(checker(data, context, {user: userDoc})).then(isAllowed => {
        if (isAllowed) {
          return action(data, context, {user: userDoc});
        } else {
          return Promise.reject(permissionDenied());
        }
      });
    });
  });
}

exports.form = {};

exports.form.submitted = function(values) {
  return {status: 'ok', values: values};
}

exports.form.error = function(errors) {
  return {status: 'error', errors};
}
