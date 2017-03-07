import assert from 'assert';
import iCloudSession, { requestICloudData } from '../src';

describe('typeof', () => {
  it('iCloudSession is an object', () => {
    assert.equal(typeof iCloudSession === 'object', true);
  });
  it('iCloudSession.login is a function', () => {
    assert.equal(typeof iCloudSession.login === 'function', true);
  });
  it('iCloudSession.loadSessionFile is a function', () => {
    assert.equal(typeof iCloudSession.loadSessionFile === 'function', true);
  });
  it('iCloudSession.saveSession is a function', () => {
    assert.equal(typeof iCloudSession.saveSession === 'function', true);
  });
  it('iCloudSession.validateSession is a function', () => {
    assert.equal(typeof iCloudSession.validateSession === 'function', true);
  });
  it('requestICloudData is a function', () => {
    assert.equal(typeof requestICloudData === 'function', true);
  });
});
