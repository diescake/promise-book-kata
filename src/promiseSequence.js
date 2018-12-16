const fetch = require('node-fetch');

const sleep = () => new Promise(resolve => setTimeout(() => {
  console.log('sleeping...')
  resolve('slept');
}, 1000));

function sequenceTasks(tasks) {
  function recordValue(results, value) {
    results.push(value);
    return results;
  }
  var pushValue = recordValue.bind(null, []);
  return tasks.reduce(function (promise, task) {
    return promise.then(task).then(pushValue);
  }, Promise.resolve());
}

var request = {
  comment: function getComment() {
    return fetch('http://azu.github.io/promises-book/json/comment.json')
    .then(res => res.json())
    .then(json => json[0].name);
  },
  people: function getPeople() {
    return fetch('http://azu.github.io/promises-book/json/people.json')
    .then(res => res.json())
    .then(json => json[0].name);
  }
};

function main() {
  return sequenceTasks([
    sleep,
    request.comment,
    sleep,
    request.people,
    sleep,
  ]);
}

main().then(function (value) {
  console.log(value);
}).catch(function(error){
  console.error(error);
});
