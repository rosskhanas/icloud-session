const util = require('util');
const requestICloudData = require('../lib').requestICloudData;

module.exports = (session, callback) => {
  const contactUrl = session.webservices.contacts.url;
  const params = {
    locale: 'en_US',
    order: 'last,first',
  };
  const contactUrlFormatted = util.format('%s/co/startup?locale=%s&order=%s', contactUrl, params.locale, params.order);
  requestICloudData(session, contactUrlFormatted, null, callback);
};
