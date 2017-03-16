const fs = require('fs');
const iCloud = require('../lib').default;

function saveSession(sessionPath, session) {
  fs.writeFileSync(sessionPath, JSON.stringify(session, null, 2));
}

iCloud.login({
  apple_id: 'email',
  password: 'password',
}, (err, session) => {
  if (err) {
    throw new Error('nope');
  }
  saveSession('session.json', session);
});
