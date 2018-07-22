const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.auth = admin.auth();
exports.firestore = admin.firestore();
exports.functions = functions;
exports.storage = admin.storage();
