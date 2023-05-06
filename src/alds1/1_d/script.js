"use strict";
// 螺旋本 P.46 最大の利益
// https://onlinejudge.u-aizu.ac.jp/courses/lesson/1/ALDS1/1/ALDS1_1_D
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {}; // ダミーexport
// -----------------------------------------------------------------------------
var config;
if (process.platform === "win32") {
    config = { stdin: "".concat(__dirname, "/test1.txt"), newline: "\r\n" };
}
else {
    config = { stdin: "/dev/stdin", newline: "\n" };
}
var input = require("fs").readFileSync(config.stdin, "ascii");
var lines = input.trim().split(config.newline);
var n = Number(lines[0]);
var maxv = -9999999999;
var minv = Number(lines[1]);
for (var i = 2; i <= n; i++) {
    var v = Number(lines[i]);
    maxv = Math.max(maxv, v - minv);
    minv = Math.min(minv, v);
}
console.log(maxv);
