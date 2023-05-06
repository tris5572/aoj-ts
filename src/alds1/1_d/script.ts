// 螺旋本 P.46 最大の利益
// https://onlinejudge.u-aizu.ac.jp/courses/lesson/1/ALDS1/1/ALDS1_1_D

export default {}; // ダミーexport

// -----------------------------------------------------------------------------

let config;

if (process.platform === "win32") {
  config = { stdin: `${__dirname}/test1.txt`, newline: "\r\n" };
} else {
  config = { stdin: "/dev/stdin", newline: "\n" };
}

const input: string = require("fs").readFileSync(config.stdin, "ascii");
const lines = input.trim().split(config.newline);

const n = Number(lines[0]);

let maxv = -9999999999;
let minv = Number(lines[1]);

for (let i = 2; i <= n; i++) {
  const v = Number(lines[i]);
  maxv = Math.max(maxv, v - minv);
  minv = Math.min(minv, v);
}

console.log(maxv);
