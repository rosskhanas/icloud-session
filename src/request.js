import fetch from 'node-fetch';
import HEADERS from './headers';

export default (session, url, data, callback) => {
  const method = data ? 'POST' : 'GET';
  const cookies = session.cookies.map((cookie) => {
    const cookieKey = Object.keys(cookie).find(key => key.match(/X-APPLE.*/));
    return `${cookieKey}=${cookie[cookieKey]}`;
  }).join('; ');
  const headers = Object.assign({}, HEADERS, {
    'content-length': data ? Buffer.byteLength(data) : undefined,
    cookie: cookies,
  });
  fetch(url, {
    method,
    headers,
    body: data,
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
