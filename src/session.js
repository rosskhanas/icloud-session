import fs from 'fs';
import url from 'url';
import merge from 'mout/object/merge';
import request from 'nyks/http/request';
import sort from 'nyks/object/sort';
import { parse_cookie as parseCookie } from 'nyks/http/header/parse';
import HEADERS from './headers';

function login(credentials, callback) {
  const remote = 'https://setup.icloud.com/setup/ws/1/login';
  const data = merge({
    extended_login: true,
  }, credentials);
  request(merge(url.parse(remote), { headers: HEADERS, json: true }), data, (err, body, res) => {
    const cookies = res.headers['set-cookie'];
    const jar = {};
    cookies.forEach((cookie) => {
      const cookie1 = parseCookie(cookie);
      jar[cookie1.name] = cookie1;
    });
    const session = sort(body, ['dsInfo', 'webservices']);
    session.jar = jar;
    session.session_creation = Date.now();
    callback(null, session);
  });
}

function validateSession(session, callback) {
  const age = (Date.now() - Number(session.session_creation || 0)) / 1000;
  if (age > 86400 * 5) {
    callback('Session too old');
    return;
  }
  callback(null, session);
}

function loadSessionFile(sessionPath, callback) {
  let session;
  try {
    session = fs.readFileSync(sessionPath);
    session = JSON.parse(session);
  } catch (e) {
    callback(e);
    return;
  }
  validateSession(session, callback);
}

function saveSession(sessionPath, session) {
  fs.writeFileSync(sessionPath, JSON.stringify(session, null, 2));
}

export default {
  login,
  loadSessionFile,
  saveSession,
};
