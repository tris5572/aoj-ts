"use strict";
// 螺旋本 P.188 根付き木
// https://onlinejudge.u-aizu.ac.jp/courses/lesson/1/ALDS1/7/ALDS1_7_A
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
var NIL = -1;
var tree = [];
var input = require("fs").readFileSync(config.stdin, "ascii");
var lines = input.trim().split(config.newline);
var n = Number(lines[0]);
for (var i = 0; i < n; i++) {
    tree.push({
        parent: NIL,
        left: NIL,
        right: NIL,
    });
}
for (var i = 1; i <= n; i++) {
    var l = 0;
    var line = lines[i];
    var _a = line
        .trim()
        .split(" ")
        .map(function (v) { return Number(v); }), id = _a[0], k = _a[1], children = _a.slice(2);
    for (var j = 0; j < k; j++) {
        var c = children[j];
        if (j === 0) {
            tree[id].left = c;
        }
        else {
            tree[l].right = c;
        }
        l = c;
        tree[c].parent = id;
    }
}
for (var i = 0; i < n; i++) {
    print(i);
}
function getDepth(u) {
    var d = 0;
    while (tree[u].parent !== NIL) {
        u = tree[u].parent;
        d++;
    }
    return d;
}
function print(u) {
    process.stdout.write("node ".concat(u, ": "));
    process.stdout.write("parent = ".concat(tree[u].parent, ", "));
    process.stdout.write("depth = ".concat(getDepth(u), ", "));
    if (tree[u].parent === NIL) {
        process.stdout.write("root, ");
    }
    else if (tree[u].left === NIL) {
        process.stdout.write("leaf, ");
    }
    else {
        process.stdout.write("internal node, ");
    }
    process.stdout.write("[");
    for (var i = 0, c = tree[u].left; c != NIL; i++, c = tree[c].right) {
        if (i !== 0) {
            process.stdout.write(", ");
        }
        process.stdout.write("".concat(c));
    }
    console.log("]");
}
