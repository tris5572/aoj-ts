// 螺旋本 P.54 挿入ソート
// https://onlinejudge.u-aizu.ac.jp/courses/lesson/1/ALDS1/1/ALDS1_1_A

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
const a = lines[1].split(" ").map((v) => Number(v));

console.log(a.join(" "));

for (let i = 1; i < n; i++) {
  const v = a[i];
  let j = i - 1;
  while (0 <= j && v < a[j]) {
    a[j + 1] = a[j];
    j--;
  }
  a[j + 1] = v;
  console.log(a.join(" "));
}
