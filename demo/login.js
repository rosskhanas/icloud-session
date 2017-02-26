const iCloud = require('../lib').default;

iCloud.login({
  apple_id: 'email',
  password: 'password',
}, (err, session) => {
  if (err) {
    throw new Error('nope');
  }
  iCloud.saveSession('session.json', session);
});
