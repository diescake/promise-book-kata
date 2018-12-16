const fetch = require('node-fetch');

const log = (param) => new Promise(resolve => {
  resolve(param);
});

const sleep = (time) => new Promise(resolve => setTimeout(() => {
  console.log(`sleeping ${time}ms...`);
  resolve('waked up');
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

exports.default = {
  sleep,
  request
};
