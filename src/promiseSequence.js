const fetch = require('node-fetch');

const log = (value) => new Promise(resolve => {
  console.log('fetching...');
  resolve(value);
});

const sleep = () => new Promise(resolve => setTimeout(() => {
  console.log('sleeping...');
  resolve('slept');
}, 1000));

const sequenceTasks = tasks => {
  const recordValue = (results, value) => {
    results.push(value);
    return results;
  }
  const pushValue = recordValue.bind(null, []);
  return tasks.reduce(
    (promise, task) => promise.then(task).then(pushValue),
    Promise.resolve()
  );
};

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

sequenceTasks([
  sleep,
  request.comment,
  sleep,
  request.people,
  sleep,
]).then(result => {
  console.log(result);
}).catch(error => {
  console.error(error);
});
