const assert = require('assert');
const { shouldRejected } = require('./promise-test-helper').default;

const failTest = () => Promise.reject('Expected promise to be rejected but it was fulfilled.');

const mayBeFulfilled = () => {
  return Promise.reject(new Error());
};

const mayBeRejected = () => {
  return Promise.reject(new Error('woo'));
};

describe('Promise Test', () => {
  it('Should use `done` for test', done => {
    setTimeout(() => {
      assert(true);
      done();
    }, 100);
  });

  it('Should use `done` for test', done => {
    Promise.resolve(42).then(value => {
      assert(value === 42);
    }).then(done, done);
  });

  it('Support to return Promise object directly', () => {
    return Promise.resolve(42).then(value => {
      assert(value === 42);
    });
  });

  it('Is bad pattern', () => {
    return mayBeRejected().catch(error => {
      assert(error.message === 'woo');
    });
  });

  it('Is good pattern', () => {
    return mayBeRejected().then(failTest, error => {
      assert(error.message === 'woo');
    });
  });

  it('Is good pattern', () => {
    const promise = Promise.reject(new Error('woo'));
    // const promise = Promise.resolve('woo');
    return shouldRejected(promise).catch(error => {
      assert(error.message === 'woo');
    });
  });
});
