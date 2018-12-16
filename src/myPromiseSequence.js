const sleep = (time) => new Promise(resolve => setTimeout(() => {
  console.log(`sleep: ${time}`);
  resolve(time);
}, time));

const sequenceTasks = tasks => {
  const recordValue = (results, value) => {
    results.push(value);
    return results;
  };

  const pushValue = recordValue.bind(null, []);
  return tasks.reduce(
    (promise, task) => promise.then(task.f.bind(null, task.v)).then(pushValue),
    Promise.resolve()
  );
};

sequenceTasks([
  { f: sleep, v: 100 },
  { f: sleep, v: 800 },
  { f: sleep, v: 1000 },
  { f: sleep, v: 10 },
]).then(result => {
  console.log(result);
}).catch(error => {
  console.error(error);
});
