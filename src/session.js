import { parse as parseCookie } from 'cookie';
import fetch from 'node-fetch';
import HEADERS from './headers';

function login(credentials, callback = () => {}) {
  const remote = 'https://setup.icloud.com/setup/ws/1/login';
  const data = JSON.stringify(Object.assign({}, {
    extended_login: true,
  }, credentials));
  fetch(remote, {
    method: 'POST',
    headers: Object.assign({}, HEADERS, {
      'content-length': Buffer.byteLength(data),
    }),
    body: data,
  }).catch(error => callback(error))
    .then((res) => {
      if (res.status >= 400) {
        throw new Error('Probably credentials are not correct.');
      }
      return res.json().then((json) => {
        if (json.error) {
          callback(new Error(json.error));
          return;
        }
        const cookiesHeader = res.headers.raw()['set-cookie'];
        const cookies = cookiesHeader.map(cookie => parseCookie(cookie));
        const session = {
          dsInfo: json.dsInfo,
          webservices: json.webservices,
          cookies,
        };
        session.session_creation = Date.now();
        callback(null, session);
      }).catch(error => callback(error));
    }).catch(error => callback(error));
}

function validateSession(session, callback = () => {}) {
  const age = (Date.now() - Number(session.session_creation || 0)) / 1000;
  if (age > 86400 * 5) {
    callback('Session too old');
    return;
  }
  callback(null, session);
}

export default {
  login,
  validateSession,
};
