const shouldFulfilled = (promise) => ({
  then: fn => promise.then(
    value => fn.call(promise, value),
    () => Promise.reject(new Error('Expected promise to be fulfilled but it was rejected.')),
  ),
});

const shouldRejected = (promise) => ({
  catch: fn => promise.then(
    () => Promise.reject(new Error('Expected promise to be rejected but it was fulfilled.')),
    reason => fn.call(promise, reason),
  ),
});

exports.default = {
  shouldFulfilled,
  shouldRejected,
};
