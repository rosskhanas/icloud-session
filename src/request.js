import merge from 'mout/object/merge';
import request from 'nyks/http/request';
import HEADERS from './headers';

export default (session, query, data, callback) => {
  const queryExt = merge(query, {
    jar: session.jar,
    headers: HEADERS,
    json: true,
  });
  request(queryExt, data, callback);
};
