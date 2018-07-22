const { firestore } = require('./firebase');
const { authenticatedFunction, form } = require('./util');

exports.create = authenticatedFunction((data, context, {user}) => {
  return user.get('site_admin') || user.get('shop_admin');
}, (data, context) => {
  if (data.name === null || data.name === '') {
    return form.error({name: "can't be blank"});
  }

  return firestore.collection('certifications').add({
    name: data.name
  }).then(ref => {
    return form.submitted({id: ref.id});
  });
});

exports.update = authenticatedFunction((data, context, {user}) => {
  return user.get('site_admin') || user.get('shop_admin');
}, (data, context) => {
  if (data.name === null || data.name === '') {
    return form.error({name: "can't be blank"});
  }

  return firestore.collection('certifications').doc(data.id).update({
    name: data.name
  }).then(ref => {
    return form.submitted({id: ref.id});
  })
});
