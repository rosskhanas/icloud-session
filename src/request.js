import fetch from 'node-fetch';
import HEADERS from './headers';

export default (session, url, body, callback = () => {}) => {
  const method = body ? 'POST' : 'GET';
  const cookies = session.cookies.map((cookie) => {
    const cookieKey = Object.keys(cookie).find(key => key.match(/X-APPLE.*/));
    return `${cookieKey}=${cookie[cookieKey]}`;
  }).join('; ');
  const headers = {
    ...HEADERS,
    'content-length': body ? Buffer.byteLength(body) : undefined,
    cookie: cookies,
  };
  fetch(url, {
    method,
    headers,
    body,
  }).catch(error => callback(error))
    .then((res) => {
      if (res.status >= 400) {
        callback(new Error(res.statusText));
        return;
      }
      res.json()
        .then(json => callback(null, json))
        .catch(error => callback(error));
    }).catch(error => callback(error));
};
