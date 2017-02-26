const iCloud = require('../lib').default;
const fetchAllContacts = require('./contact');

iCloud.loadSessionFile('session.json', (err, session) => {
  if (err) {
    throw new Error('Try refreshing your credentials (session has expired)');
  }
  fetchAllContacts(session, (err1, body) => {
    console.log(err1, body);
  });
});
