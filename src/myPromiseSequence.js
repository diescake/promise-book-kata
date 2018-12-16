const sleep = (time) => new Promise(resolve => setTimeout(() => {
  console.log(`sleep: ${time}`);
  resolve(time);
}, time));

const sequenceTasks = (tasks) => {
  const recordValue = (results, value) => {
    results.push(value);
    return results;
  };
  const pushValue = recordValue.bind(null, []);
  return tasks.reduce((promise, task) => {
    return promise.then(task.f.call(null, task.argv)).then(pushValue);
  }, Promise.resolve());
};

sequenceTasks([
  {
    f: sleep,
    argv: 100,
  },
  {
    f: sleep,
    argv: 100,
  },
  {
    f: sleep,
    argv: 1000,
  },
  {
    f: sleep,
    argv: 10,
  },
]).then(result => {
  console.log(result);
}).catch(error => {
  console.error(error);
});
