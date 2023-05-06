"use strict";
// 螺旋本 P.54 挿入ソート
// https://onlinejudge.u-aizu.ac.jp/courses/lesson/1/ALDS1/1/ALDS1_1_A
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
var a = lines[1].split(" ").map(function (v) { return Number(v); });
console.log(a.join(" "));
for (var i = 1; i < n; i++) {
    var v = a[i];
    var j = i - 1;
    while (0 <= j && v < a[j]) {
        a[j + 1] = a[j];
        j--;
    }
    a[j + 1] = v;
    console.log(a.join(" "));
}
