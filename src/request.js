import merge from 'mout/object/merge';
import request from 'nyks/http/request';
import HEADERS from './headers';

export default (session, query, data, callback) => {
  const query1 = merge(query, {
    jar: session.jar,
    headers: HEADERS,
    json: true,
  });
  request(query1, data, callback);
};
