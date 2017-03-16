const fs = require('fs');
const fetchAllContacts = require('./contact');
const iCloud = require('../lib').default;

function loadSessionFile(sessionPath, callback) {
  let session;
  try {
    session = fs.readFileSync(sessionPath);
    session = JSON.parse(session);
  } catch (e) {
    callback(e);
    return;
  }
  iCloud.validateSession(session, callback);
}

loadSessionFile('session.json', (err, session) => {
  if (err) {
    throw new Error('Try refreshing your credentials (session has expired)');
  }
  fetchAllContacts(session, (err1, body) => {
    console.log(err1, body);
  });
});
