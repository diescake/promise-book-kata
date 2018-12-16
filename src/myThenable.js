const { sleep, request } = require('./myPromiseObject').default;

const promiseLikeObject = (message) => ({
  then(resolve, reject) {
    resolve(message);
  }
});

const sequenceTasks = tasks => {
  const pushValue = ((results, value) => {
    results.push(value);
    return results;
  }).bind(null, []);

  return tasks.reduce(
    (promise, task) => promise.then(task.f.bind(null, task.v)).then(pushValue),
    Promise.resolve()
  );
};

sequenceTasks([
  { f: sleep, v: 1000 },
]).then(result => {
  console.log(result);
  return promiseLikeObject('pomeranian');
}).then(result => {
  console.log(result);
}).catch(error => {
  console.error(error);
});
