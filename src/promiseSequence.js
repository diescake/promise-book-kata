const fetch = require('node-fetch');

const log = (value) => new Promise(resolve => {
  console.log('fetching...');
  resolve(value);
});

const sleep = (time) => new Promise(resolve => setTimeout(() => {
  console.log(`${time} sleeping...`);
  resolve('slept');
}, time));

const request = {
  comment() {
    return fetch('http://azu.github.io/promises-book/json/comment.json')
    .then(log)
    .then(res => res.json())
    .then(json => json[0].name);
  },
  people() {
    return fetch('http://azu.github.io/promises-book/json/people.json')
    .then(log)
    .then(res => res.json())
    .then(json => json[0].name);
  }
};

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
  { f: request.comment, v: 0 },
  { f: sleep, v: 500 },
  { f: request.people, v: 0 },
  { f: sleep, v: 1000 },
]).then(result => {
  console.log(result);
}).catch(error => {
  console.error(error);
});
