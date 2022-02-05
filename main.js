const _ = require('lodash');

console.time();
_.map([1, 2, 3], (n) => console.log(n * 2));
console.timeEnd();

console.time();
[1, 2, 3].map((n) => console.log(n * 2));
console.timeEnd();

console.time('lodash');
console.log(_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 }));
console.timeEnd('lodash');

console.time('Javascript');
console.log({ 'a': 1 }, { 'a': 3, 'b': 2 });
console.timeEnd('Javascript');
