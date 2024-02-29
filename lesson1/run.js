let util = require('./util');

let result = util.add(1, 2);

console.log("Hose", util.HOSE); // 3

console.log("result", result); // 3

function sumFromTo(min, max, step) {
  let sum = 0;

  for (let n = min; n <= max; n += step) {
    console.log("n", n);
    sum += n; 
  }

  return sum;
}

console.log(
  sumFromTo(1, 5, 2) // 9
);