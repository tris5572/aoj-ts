// 螺旋本 P.193 二分木
// https://onlinejudge.u-aizu.ac.jp/courses/lesson/1/ALDS1/7/ALDS1_7_B

// データ自体は配列に保存する。
// depth と height をデータ内に持つ形で実装してみる。

export default {}; // ダミーexport

// -----------------------------------------------------------------------------
// TypeScriptで書いたものをJavaScriptへ変換
let config;

if (process.platform === "win32") {
  config = { stdin: `${__dirname}/test3.txt`, newline: "\r\n" };
} else {
  config = { stdin: "/dev/stdin", newline: "\n" };
}

type Node = {
  parent: number;
  left: number;
  right: number;
  depth: number;
  height: number;
};

const NIL = -1;
const tree: Node[] = [];

const input: string = require("fs").readFileSync(config.stdin, "ascii");
const lines = input.trim().split(config.newline);

const n = Number(lines[0]);

for (let i = 0; i < n; i++) {
  tree.push({
    parent: NIL,
    left: NIL,
    right: NIL,
    depth: NIL,
    height: NIL,
  });
}

for (let i = 1; i <= n; i++) {
  const line = lines[i];
  const [id, left, right] = line
    .trim()
    .split(" ")
    .map((v) => Number(v));

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
let root = 0;
for (let i = 0; i < n; i++) {
  if (tree[i].parent === NIL) {
    root = i;
  }
}

setDepth(root, 0);
setHeight(root);
print();

function setDepth(id: number, depth: number) {
  tree[id].depth = depth;
  if (tree[id].left !== NIL) {
    setDepth(tree[id].left, depth + 1);
  }
  if (tree[id].right !== NIL) {
    setDepth(tree[id].right, depth + 1);
  }
}

function setHeight(id: number): number {
  let hl = 0;
  let hr = 0;
  if (tree[id].left !== NIL) {
    hl = setHeight(tree[id].left);
  }
  if (tree[id].right !== NIL) {
    hr = setHeight(tree[id].right);
  }
  let h = Math.max(hl, hr);

  tree[id].height = h;
  return h + 1;
}

function getSibling(id: number): number {
  const parent = tree[id].parent;
  if (parent === NIL) {
    return -1;
  }
  if (tree[parent].left === id) {
    return tree[parent].right;
  }
  return tree[parent].left;
}

function getDegree(id: number): number {
  let deg = 2;
  if (tree[id].left === NIL) {
    deg--;
  }
  if (tree[id].right === NIL) {
    deg--;
  }
  return deg;
}

function print() {
  for (let i = 0; i < n; i++) {
    process.stdout.write(`node ${i}: `);
    process.stdout.write(`parent = ${tree[i].parent}, `);
    process.stdout.write(`sibling = ${getSibling(i)}, `);
    process.stdout.write(`degree = ${getDegree(i)}, `);
    process.stdout.write(`depth = ${tree[i].depth}, `);
    process.stdout.write(`height = ${tree[i].height}, `);

    if (tree[i].parent === NIL) {
      console.log("root");
    } else if (tree[i].left === NIL && tree[i].right === NIL) {
      console.log("leaf");
    } else {
      console.log("internal node");
    }
  }
}
