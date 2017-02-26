const url = require('url');
const util = require('util');
const merge = require('mout/object/merge');
const requestICloudData = require('../lib').requestICloudData;

module.exports = (session, callback) => {
  const contactUrl = session.webservices.contacts.url;
  const contactUrlFormatted = util.format('%s/co/startup', contactUrl);
  // params = merge(params, {'dsid': session['dsInfo']['dsid']});
  const params = merge({}, {
    // clientVersion : "2.1",
    locale: 'en_US',
    order: 'last,first',
  });
  const query = merge(url.parse(contactUrlFormatted), {
    qs: params,
  });
  requestICloudData(session, query, null, callback);
};
