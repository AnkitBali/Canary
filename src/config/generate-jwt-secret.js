// Use crypto module to generate JWT secret
const crypto = require('crypto');

const hash = crypto.randomBytes(32).toString('hex');

console.time('Hashing');
console.log('Generated JWT secret: ', hash);
console.timeEnd('Hashing')