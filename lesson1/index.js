const { generateHash } = require('./util');

const hash = generateHash(10);
console.log('Generated Hash:', hash);