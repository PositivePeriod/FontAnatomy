const Polynomial = require('polynomial');

var p = new Polynomial("3x^2").add("-x^2"); // 2x^2
console.log(p);