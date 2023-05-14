"use strict";
// 螺旋本 P.193 二分木
// https://onlinejudge.u-aizu.ac.jp/courses/lesson/1/ALDS1/7/ALDS1_7_B
Object.defineProperty(exports, "__esModule", { value: true });
// データ自体は配列に保存する。
// depth と height をデータ内に持つ形で実装してみる。
exports.default = {}; // ダミーexport
// -----------------------------------------------------------------------------
// TypeScriptで書いたものをJavaScriptへ変換
var config;
if (process.platform === "win32") {
    config = { stdin: "".concat(__dirname, "/test3.txt"), newline: "\r\n" };
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
        depth: NIL,
        height: NIL,
    });
}
for (var i = 1; i <= n; i++) {
    var line = lines[i];
    var _a = line
        .trim()
        .split(" ")
        .map(function (v) { return Number(v); }), id = _a[0], left = _a[1], right = _a[2];
    tree[id].left = left;
    tree[id].right = right;
    if (left !== NIL) {
        tree[left].parent = id;
    }
    if (right !== NIL) {
        tree[right].parent = id;
    }
}
// root を検索
var root = 0;
for (var i = 0; i < n; i++) {
    if (tree[i].parent === NIL) {
        root = i;
    }
}
setDepth(root, 0);
setHeight(root);
print();
function setDepth(id, depth) {
    tree[id].depth = depth;
    if (tree[id].left !== NIL) {
        setDepth(tree[id].left, depth + 1);
    }
    if (tree[id].right !== NIL) {
        setDepth(tree[id].right, depth + 1);
    }
}
function setHeight(id) {
    var hl = 0;
    var hr = 0;
    if (tree[id].left !== NIL) {
        hl = setHeight(tree[id].left);
    }
    if (tree[id].right !== NIL) {
        hr = setHeight(tree[id].right);
    }
    var h = Math.max(hl, hr);
    tree[id].height = h;
    return h + 1;
}
function getSibling(id) {
    var parent = tree[id].parent;
    if (parent === NIL) {
        return -1;
    }
    if (tree[parent].left === id) {
        return tree[parent].right;
    }
    return tree[parent].left;
}
function getDegree(id) {
    var deg = 2;
    if (tree[id].left === NIL) {
        deg--;
    }
    if (tree[id].right === NIL) {
        deg--;
    }
    return deg;
}
function print() {
    for (var i = 0; i < n; i++) {
        process.stdout.write("node ".concat(i, ": "));
        process.stdout.write("parent = ".concat(tree[i].parent, ", "));
        process.stdout.write("sibling = ".concat(getSibling(i), ", "));
        process.stdout.write("degree = ".concat(getDegree(i), ", "));
        process.stdout.write("depth = ".concat(tree[i].depth, ", "));
        process.stdout.write("height = ".concat(tree[i].height, ", "));
        if (tree[i].parent === NIL) {
            console.log("root");
        }
        else if (tree[i].left === NIL && tree[i].right === NIL) {
            console.log("leaf");
        }
        else {
            console.log("internal node");
        }
    }
}
