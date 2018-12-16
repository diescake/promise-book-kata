console.log('Start');

const promise = new Promise((resolve, reject) => {
  console.log('Promise start');
  resolve();
  // reject();
  console.log('Promise end');
});

promise.then(() => {
  console.log('Then onFulfilled start');
}, () => {
  console.log('Then onRejected start');
});

promise.then(() => {
  console.log('Then onFulfilled start');
  throw new Error();
})
.catch(() => {
  console.log('Catch start');
});

promise.then();

Promise.resolve(100).then(v => {
  console.log(v);
});

Promise.resolve().then(() => {
  console.log('hoge');
})

console.log('EOF =========');

Promise.resolve()
.then(() => {
  console.log('then1');
  return Promise.reject();
})
.catch(() => {
  console.log('catch1');
})
.then(() => {
  console.log('then2');
  // return Promise.resolve(10);
  return 10;
})
.then((v) => {
  console.log(v);
});
